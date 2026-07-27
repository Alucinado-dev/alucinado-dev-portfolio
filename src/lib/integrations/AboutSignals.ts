import 'server-only'
import { z } from 'zod'

import type { AboutSignal, GitHubActivity, SpotifyActivity, WakaTimeActivity } from '@/types/AboutTypes'

const CACHE_SECONDS = 60 * 60 * 6
const REQUEST_TIMEOUT_MS = 5_000

const contributionLevels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const

const githubResponseSchema = z.object({
  data: z.object({
    user: z
      .object({
        contributionsCollection: z.object({
          totalCommitContributions: z.number().int().nonnegative(),
          totalIssueContributions: z.number().int().nonnegative(),
          totalPullRequestContributions: z.number().int().nonnegative(),
          totalPullRequestReviewContributions: z.number().int().nonnegative(),
          restrictedContributionsCount: z.number().int().nonnegative(),
          contributionCalendar: z.object({
            totalContributions: z.number().int().nonnegative(),
            weeks: z.array(
              z.object({
                contributionDays: z.array(
                  z.object({
                    date: z.string(),
                    contributionCount: z.number().int().nonnegative(),
                    contributionLevel: z.enum(Object.keys(contributionLevels) as [keyof typeof contributionLevels]),
                  }),
                ),
              }),
            ),
          }),
        }),
        repositories: z.object({
          nodes: z.array(
            z
              .object({
                languages: z.object({
                  edges: z.array(
                    z
                      .object({
                        size: z.number().int().nonnegative(),
                        node: z.object({
                          name: z.string().min(1),
                          color: z
                            .string()
                            .regex(/^#[\da-f]{6}$/i)
                            .nullable(),
                        }),
                      })
                      .nullable(),
                  ),
                }),
              })
              .nullable(),
          ),
        }),
      })
      .nullable(),
  }),
})

const wakaTimeResponseSchema = z.object({
  data: z.object({
    total_seconds: z.number().nonnegative(),
    daily_average: z.number().nonnegative(),
    languages: z.array(
      z.object({
        name: z.string().min(1),
        percent: z.number().min(0).max(100),
      }),
    ),
  }),
})

const wakaTimeSummariesResponseSchema = z.object({
  data: z.array(
    z.object({
      grand_total: z.object({
        total_seconds: z.number().nonnegative(),
      }),
      range: z.object({
        date: z.string(),
      }),
    }),
  ),
})

const spotifyTokenSchema = z.object({
  access_token: z.string().min(1),
  expires_in: z.number().positive(),
})

const spotifyTrackSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9]{22}$/),
  type: z.literal('track'),
  name: z.string().min(1),
  artists: z.array(z.object({ name: z.string().min(1) })).min(1),
  album: z.object({
    images: z.array(z.object({ url: z.string().url() })),
  }),
  external_urls: z.object({ spotify: z.string().url() }),
})

const spotifyCurrentSchema = z.object({
  is_playing: z.boolean(),
  item: spotifyTrackSchema.nullable(),
})

const spotifyRecentSchema = z.object({
  items: z.array(
    z.object({
      track: spotifyTrackSchema,
      played_at: z.string().datetime(),
    }),
  ),
})

type SpotifyToken = { value: string; expiresAt: number }

let spotifyToken: SpotifyToken | null = null
let spotifyTokenRequest: Promise<SpotifyToken> | null = null

function unavailable<T>(): AboutSignal<T> {
  return { status: 'unavailable' }
}

function requestSignal(timeoutMs = REQUEST_TIMEOUT_MS) {
  return AbortSignal.timeout(timeoutMs)
}

function reportUnavailable(service: 'github' | 'wakatime' | 'spotify', category: string) {
  // Falhas esperadas de terceiros não devem aparecer como erros da interface no navegador durante o desenvolvimento.
  // eslint-disable-next-line no-console
  console.info(`[about/${service}] ${category}`)
}

export async function getGitHubActivity(): Promise<AboutSignal<GitHubActivity>> {
  const username = process.env.GITHUB_USERNAME?.trim()
  const token = process.env.GITHUB_TOKEN?.trim()
  if (!username || !token) return unavailable()

  const to = new Date()
  const from = new Date(to)
  from.setUTCFullYear(from.getUTCFullYear() - 1)

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'alucinado-dev-portfolio',
      },
      body: JSON.stringify({
        query: `query PortfolioContributions($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              restrictedContributionsCount
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { date contributionCount contributionLevel }
                }
              }
            }
            repositories(
              first: 100
              ownerAffiliations: [OWNER]
              isFork: false
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              nodes {
                languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                  edges {
                    size
                    node { name color }
                  }
                }
              }
            }
          }
        }`,
        variables: { login: username, from: from.toISOString(), to: to.toISOString() },
      }),
      next: { revalidate: CACHE_SECONDS },
      signal: requestSignal(10_000),
    })

    if (!response.ok) throw new Error('http')

    const parsed = githubResponseSchema.safeParse(await response.json())
    const user = parsed.success ? parsed.data.data.user : null
    const calendar = user?.contributionsCollection.contributionCalendar
    if (!user || !calendar) throw new Error('invalid_response')

    const languageTotals = new Map<string, { size: number; color: string }>()

    for (const repository of user.repositories.nodes) {
      if (!repository) continue

      for (const edge of repository.languages.edges) {
        if (!edge || edge.size === 0) continue

        const current = languageTotals.get(edge.node.name)
        languageTotals.set(edge.node.name, {
          size: (current?.size ?? 0) + edge.size,
          color: edge.node.color ?? current?.color ?? '#64748b',
        })
      }
    }

    const totalLanguageSize = [...languageTotals.values()].reduce((total, language) => total + language.size, 0)
    const languages =
      totalLanguageSize > 0
        ? [...languageTotals.entries()]
            .sort(([, first], [, second]) => second.size - first.size)
            .slice(0, 5)
            .map(([name, language]) => ({
              name,
              percent: Number(((language.size / totalLanguageSize) * 100).toFixed(1)),
              color: language.color,
            }))
        : []

    return {
      status: 'available',
      updatedAt: new Date().toISOString(),
      data: {
        totalContributions: calendar.totalContributions,
        activity: {
          commits: user.contributionsCollection.totalCommitContributions,
          pullRequests: user.contributionsCollection.totalPullRequestContributions,
          issues: user.contributionsCollection.totalIssueContributions,
          pullRequestReviews: user.contributionsCollection.totalPullRequestReviewContributions,
          privateContributions: user.contributionsCollection.restrictedContributionsCount,
        },
        languages,
        profileUrl: `https://github.com/${encodeURIComponent(username)}`,
        weeks: calendar.weeks.map(week => ({
          days: week.contributionDays.map(day => ({
            date: day.date,
            count: day.contributionCount,
            level: contributionLevels[day.contributionLevel],
          })),
        })),
      },
    }
  } catch (error) {
    reportUnavailable('github', error instanceof Error ? error.message : 'unavailable')
    return unavailable()
  }
}

export async function getWakaTimeActivity(): Promise<AboutSignal<WakaTimeActivity>> {
  const apiKey = process.env.WAKATIME_API_KEY?.trim()
  if (!apiKey) return unavailable()

  try {
    const headers = {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
    }
    const [statsResponse, summariesResponse] = await Promise.all([
      fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
        headers,
        next: { revalidate: CACHE_SECONDS },
        signal: requestSignal(),
      }),
      fetch('https://wakatime.com/api/v1/users/current/summaries?range=Last%207%20Days', {
        headers,
        next: { revalidate: CACHE_SECONDS },
        signal: requestSignal(),
      }),
    ])

    if (!statsResponse.ok || !summariesResponse.ok) throw new Error('http')

    const [statsPayload, summariesPayload] = await Promise.all([statsResponse.json(), summariesResponse.json()])
    const parsed = wakaTimeResponseSchema.safeParse(statsPayload)
    const summariesParsed = wakaTimeSummariesResponseSchema.safeParse(summariesPayload)
    if (!parsed.success || !summariesParsed.success) throw new Error('invalid_response')

    const activity = parsed.data.data
    if (activity.total_seconds < 3_600 || activity.languages.length === 0) return unavailable()

    return {
      status: 'available',
      updatedAt: new Date().toISOString(),
      data: {
        totalSeconds: Math.round(activity.total_seconds),
        dailyAverageSeconds: Math.round(activity.daily_average),
        languages: activity.languages.slice(0, 3).map(language => ({
          name: language.name,
          percent: Math.round(language.percent * 10) / 10,
        })),
        days: summariesParsed.data.data.map(day => ({
          date: day.range.date,
          totalSeconds: Math.round(day.grand_total.total_seconds),
        })),
      },
    }
  } catch {
    reportUnavailable('wakatime', 'unavailable')
    return unavailable()
  }
}

async function refreshSpotifyAccessToken(): Promise<SpotifyToken> {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim()
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim()
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim()
  if (!clientId || !clientSecret || !refreshToken) throw new Error('missing_configuration')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    cache: 'no-store',
    signal: requestSignal(),
  })

  if (!response.ok) throw new Error('token_request')
  const parsed = spotifyTokenSchema.safeParse(await response.json())
  if (!parsed.success) throw new Error('invalid_token_response')

  return {
    value: parsed.data.access_token,
    expiresAt: Date.now() + Math.max(60, parsed.data.expires_in - 60) * 1_000,
  }
}

async function getSpotifyAccessToken(forceRefresh = false) {
  if (!forceRefresh && spotifyToken && spotifyToken.expiresAt > Date.now()) return spotifyToken.value
  if (!spotifyTokenRequest) {
    spotifyTokenRequest = refreshSpotifyAccessToken().finally(() => {
      spotifyTokenRequest = null
    })
  }
  spotifyToken = await spotifyTokenRequest
  return spotifyToken.value
}

async function spotifyFetch(path: string, retry = true): Promise<Response> {
  const accessToken = await getSpotifyAccessToken(!retry)
  const response = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
    signal: requestSignal(),
  })

  if (response.status === 401 && retry) {
    spotifyToken = null
    return spotifyFetch(path, false)
  }
  return response
}

function safeSpotifyUrl(value: string) {
  const url = new URL(value)
  return url.protocol === 'https:' && url.hostname === 'open.spotify.com' ? url.toString() : null
}

function safeSpotifyImage(value: string | undefined) {
  if (!value) return null
  const url = new URL(value)
  return url.protocol === 'https:' && url.hostname === 'i.scdn.co' ? url.toString() : null
}

function normalizeSpotifyTrack(track: z.infer<typeof spotifyTrackSchema>) {
  const externalUrl = safeSpotifyUrl(track.external_urls.spotify)
  if (!externalUrl) return null

  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    albumImageUrl: safeSpotifyImage(track.album.images[0]?.url),
    externalUrl,
  }
}

export async function getSpotifyActivity(): Promise<AboutSignal<SpotifyActivity>> {
  try {
    let currentTrack: ReturnType<typeof normalizeSpotifyTrack> = null
    const currentResponse = await spotifyFetch('/me/player/currently-playing')
    if (currentResponse.ok && currentResponse.status !== 204) {
      const parsed = spotifyCurrentSchema.safeParse(await currentResponse.json())
      if (parsed.success && parsed.data.is_playing && parsed.data.item) {
        currentTrack = normalizeSpotifyTrack(parsed.data.item)
      }
    } else if (currentResponse.status !== 204) {
      throw new Error('current_request')
    }

    const recentResponse = await spotifyFetch('/me/player/recently-played?limit=10')
    if (!recentResponse.ok) throw new Error('recent_request')
    const parsed = spotifyRecentSchema.safeParse(await recentResponse.json())
    if (!parsed.success) throw new Error('invalid_recent_response')

    const uniqueRecent = parsed.data.items
      .map(item => normalizeSpotifyTrack(item.track))
      .filter(track => track !== null)
      .filter((track, index, tracks) => tracks.findIndex(candidate => candidate.id === track.id) === index)

    const featured = currentTrack ?? uniqueRecent[0] ?? null
    if (!featured) return unavailable()

    return {
      status: 'available',
      data: {
        state: currentTrack ? 'playing' : 'recent',
        featured,
        recent: uniqueRecent.filter(track => track.id !== featured.id).slice(0, 5),
      },
      updatedAt: new Date().toISOString(),
    }
  } catch {
    reportUnavailable('spotify', 'unavailable')
    return unavailable()
  }
}
