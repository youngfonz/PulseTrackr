'use client'

import { useState, useEffect } from 'react'

type ViewMode = 'table' | 'grid'

interface Props {
  onViewChange: (mode: ViewMode) => void
}

export function ViewToggle({ onViewChange }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  // Load saved view preference
  useEffect(() => {
    const savedView = localStorage.getItem('projectsViewMode') as ViewMode
    if (savedView) {
      setViewMode(savedView)
      onViewChange(savedView)
    }
  }, [onViewChange])

  // Save view preference
  const toggleView = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('projectsViewMode', mode)
    onViewChange(mode)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => toggleView('table')}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === 'table'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
        title="Table view"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
      <button
        onClick={() => toggleView('grid')}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === 'grid'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
        title="Grid view"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      </button>
    </div>
  )
}
