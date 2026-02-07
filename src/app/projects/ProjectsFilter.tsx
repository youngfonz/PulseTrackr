'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useState, useTransition, useRef, useEffect } from 'react'

interface Client {
  id: string
  name: string
}

export function ProjectsFilter({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const clientId = searchParams.get('clientId')
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')

  const activeFilterCount = [clientId, status, priority].filter(Boolean).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFiltersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const updateFilter = (key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/projects?${params.toString()}`)
    })
  }

  const clearFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('clientId')
      params.delete('status')
      params.delete('priority')
      router.push(`/projects?${params.toString()}`)
    })
    setFiltersOpen(false)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        placeholder="Search projects..."
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => updateFilter('search', e.target.value)}
        className={`flex-1 ${isPending ? 'opacity-50' : ''}`}
      />
      <div className="flex gap-2">
        {/* Filters dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-secondary transition-colors ${
              activeFilterCount > 0 ? 'border-primary text-primary' : 'border-border'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          {filtersOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50 p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Client</label>
                <Select
                  value={clientId || 'all'}
                  onChange={(e) => updateFilter('clientId', e.target.value)}
                  options={[
                    { value: 'all', label: 'All Clients' },
                    ...clients.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
                <Select
                  value={status || 'all'}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'not_started', label: 'Not Started' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'on_hold', label: 'On Hold' },
                    { value: 'completed', label: 'Completed' },
                  ]}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
                <Select
                  value={priority || 'all'}
                  onChange={(e) => updateFilter('priority', e.target.value)}
                  options={[
                    { value: 'all', label: 'All Priorities' },
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ]}
                  className="w-full"
                />
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sort dropdown */}
        <Select
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'name', label: 'Name (A-Z)' },
            { value: 'due_date', label: 'Due Soon' },
            { value: 'priority_high', label: 'Priority' },
          ]}
          className="w-32"
        />
      </div>
    </div>
  )
}
