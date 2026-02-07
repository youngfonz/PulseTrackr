'use client'

import { useState, useEffect } from 'react'

export function DashboardGreeting() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
  }, [])

  if (!now) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">&nbsp;</p>
      </div>
    )
  }

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{greeting}</h1>
      <p className="mt-0.5 text-sm text-muted-foreground">{dateStr}</p>
    </div>
  )
}
