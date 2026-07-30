import { NextResponse } from 'next/server'

import { getSpotifyActivity } from '@/lib/integrations/AboutSignals'

export const dynamic = 'force-dynamic'

export async function GET() {
  const activity = await getSpotifyActivity()

  return NextResponse.json(activity, {
    headers: {
      'Cache-Control': 'public, s-maxage=45, stale-while-revalidate=120',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
