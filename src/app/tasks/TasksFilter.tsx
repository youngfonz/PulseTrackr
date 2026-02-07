'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

interface Project {
  id: string
  name: string
  client: { name: string }
}

interface TasksFilterProps {
  currentDate?: string
  currentStatus?: string
  currentPriority?: string
  currentProjectId?: string
  currentSort?: string
  projects: Project[]
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

const priorityOptions = [
  { value: 'all', label: 'All Priority' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const sortOptions = [
  { value: 'due_date', label: 'Due Date (Soonest)' },
  { value: 'due_date_desc', label: 'Due Date (Latest)' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'project', label: 'Project (A-Z)' },
  { value: 'client', label: 'Client (A-Z)' },
  { value: 'priority_high', label: 'Priority (High First)' },
  { value: 'priority_low', label: 'Priority (Low First)' },
]

export function TasksFilter({ currentDate, currentStatus, currentPriority, currentProjectId, currentSort, projects }: TasksFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/tasks?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/tasks')
  }

  const hasFilters = currentDate || currentStatus || currentPriority || currentProjectId

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
      <Select
        value={currentProjectId || 'all'}
        onChange={(e) => updateFilter('projectId', e.target.value)}
        options={[
          { value: 'all', label: 'All Projects' },
          ...projects.map((p) => ({ value: p.id, label: `${p.name} (${p.client.name})` })),
        ]}
        className="col-span-2 sm:w-48"
      />

      <Select
        value={currentStatus || 'all'}
        onChange={(e) => updateFilter('status', e.target.value)}
        options={statusOptions}
        className="sm:w-36"
      />

      <Select
        value={currentPriority || 'all'}
        onChange={(e) => updateFilter('priority', e.target.value)}
        options={priorityOptions}
        className="sm:w-36"
      />

      <Select
        value={currentSort || 'due_date'}
        onChange={(e) => updateFilter('sort', e.target.value)}
        options={sortOptions}
        className="col-span-2 sm:w-44"
      />

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="col-span-2 sm:col-span-1">
          Clear filters
        </Button>
      )}
    </div>
  )
}
