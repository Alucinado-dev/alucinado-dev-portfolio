export type AboutSignal<T> = { status: 'available'; data: T; updatedAt: string } | { status: 'unavailable' }

export type GitHubActivity = {
  totalContributions: number
  activity: {
    commits: number
    pullRequests: number
    issues: number
    pullRequestReviews: number
    privateContributions: number
  }
  languages: Array<{
    name: string
    percent: number
    color: string
  }>
  weeks: Array<{
    days: Array<{ date: string; count: number; level: number }>
  }>
  profileUrl: string
}

export type WakaTimeActivity = {
  totalSeconds: number
  dailyAverageSeconds: number
  languages: Array<{ name: string; percent: number }>
  days: Array<{ date: string; totalSeconds: number }>
}

export type SpotifyTrack = {
  id: string
  title: string
  artist: string
  albumImageUrl: string | null
  externalUrl: string
}

export type SpotifyActivity = {
  state: 'playing' | 'recent'
  featured: SpotifyTrack
  recent: SpotifyTrack[]
}
