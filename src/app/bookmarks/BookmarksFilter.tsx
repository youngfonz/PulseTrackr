'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useTransition } from 'react'

interface Project {
  id: string
  name: string
  client: { name: string }
}

export function BookmarksFilter({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateFilter = (key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/bookmarks?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        placeholder="Search bookmarks..."
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => updateFilter('search', e.target.value)}
        className={`flex-1 ${isPending ? 'opacity-50' : ''}`}
      />
      <div className="grid grid-cols-3 gap-2 sm:flex">
        <Select
          value={searchParams.get('projectId') || 'all'}
          onChange={(e) => updateFilter('projectId', e.target.value)}
          options={[
            { value: 'all', label: 'All Projects' },
            ...projects.map((p) => ({ value: p.id, label: p.name })),
          ]}
          className="sm:w-40"
        />
        <Select
          value={searchParams.get('type') || 'all'}
          onChange={(e) => updateFilter('type', e.target.value)}
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'youtube', label: 'YouTube' },
            { value: 'twitter', label: 'X / Twitter' },
            { value: 'website', label: 'Website' },
          ]}
          className="sm:w-32"
        />
        <Select
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'title', label: 'Title' },
            { value: 'project', label: 'Project' },
          ]}
          className="sm:w-28"
        />
      </div>
    </div>
  )
}
