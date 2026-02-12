import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (!process.env.POLAR_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const { Checkout } = await import('@polar-sh/nextjs')

  const handler = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/settings?upgraded=true`
      : '/settings?upgraded=true',
    server: (process.env.POLAR_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  })

  return handler(req)
}
