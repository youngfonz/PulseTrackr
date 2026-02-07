'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'

interface LayoutWrapperProps {
  children: React.ReactNode
  clientCount: number
  clerkEnabled?: boolean
}

export function LayoutWrapper({ children, clientCount, clerkEnabled = false }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar clientCount={clientCount} clerkEnabled={clerkEnabled} />
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
