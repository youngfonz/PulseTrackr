import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  if (!process.env.POLAR_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const { CustomerPortal } = await import('@polar-sh/nextjs')

  const handler = CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    getCustomerId: async () => {
      const { userId } = await auth()
      if (!userId) return ''

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
        select: { polarCustomerId: true },
      })

      return subscription?.polarCustomerId || ''
    },
    server: (process.env.POLAR_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  })

  return handler(req)
}
