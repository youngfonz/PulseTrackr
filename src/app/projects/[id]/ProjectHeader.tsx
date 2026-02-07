'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { updateProject, deleteProject } from '@/actions/projects'
import { useRouter } from 'next/navigation'

interface Client {
  id: string
  name: string
}

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  budget: number | null
  client: Client
}

interface ProjectHeaderProps {
  project: Project
  clients: { id: string; name: string }[]
  completedTasks: number
  totalTasks: number
  totalHours: number
}

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
}

const statusColors: Record<string, string> = {
  not_started: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  on_hold: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-emerald-100 text-emerald-700',
}

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-600',
  high: 'bg-red-100 text-red-600',
}

export function ProjectHeader({ project, clients, completedTasks, totalTasks, totalHours }: ProjectHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description || '')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleUpdateField = (field: string, value: string) => {
    const formData = new FormData()
    formData.set('name', field === 'name' ? value : project.name)
    formData.set('description', field === 'description' ? value : project.description || '')
    formData.set('status', project.status)
    formData.set('priority', project.priority)
    formData.set('clientId', project.client.id)
    if (project.dueDate) {
      formData.set('dueDate', new Date(project.dueDate).toISOString().split('T')[0])
    }
    if (project.budget) {
      formData.set('budget', project.budget.toString())
    }

    startTransition(async () => {
      await updateProject(project.id, formData)
    })
  }

  const handleNameSave = () => {
    if (name.trim() && name !== project.name) {
      handleUpdateField('name', name)
    }
    setIsEditingName(false)
  }

  const handleDescriptionSave = () => {
    if (description !== project.description) {
      handleUpdateField('description', description)
    }
    setIsEditingDescription(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This will also delete all associated tasks.')) return
    startTransition(async () => {
      await deleteProject(project.id)
      router.push('/projects')
    })
  }

  const handleStatusChange = (newStatus: string) => {
    const formData = new FormData()
    formData.set('name', project.name)
    formData.set('description', project.description || '')
    formData.set('status', newStatus)
    formData.set('priority', project.priority)
    formData.set('clientId', project.client.id)
    if (project.dueDate) {
      formData.set('dueDate', new Date(project.dueDate).toISOString().split('T')[0])
    }
    if (project.budget) {
      formData.set('budget', project.budget.toString())
    }

    startTransition(async () => {
      await updateProject(project.id, formData)
    })
  }

  return (
    <div className="border-b bg-white dark:bg-gray-900 pb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSave()
                if (e.key === 'Escape') {
                  setName(project.name)
                  setIsEditingName(false)
                }
              }}
              autoFocus
              className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent focus:outline-none w-full"
            />
          ) : (
            <h1
              onClick={() => setIsEditingName(true)}
              className="text-3xl font-bold cursor-pointer hover:text-blue-600 transition-colors"
            >
              {project.name}
            </h1>
          )}

          {isEditingDescription ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDescriptionSave}
              rows={2}
              autoFocus
              className="mt-2 w-full text-sm text-muted-foreground border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p
              onClick={() => setIsEditingDescription(true)}
              className="mt-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              {project.description || 'Click to add description...'}
            </p>
          )}

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Client:</span>
              <Link
                href={`/clients/${project.client.id}`}
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                {project.client.name}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={project.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`text-xs px-2 py-1 rounded font-medium cursor-pointer border-0 ${statusColors[project.status]}`}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className={`text-xs px-2 py-1 rounded font-medium ${priorityColors[project.priority]}`}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
            </div>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
        >
          Delete Project
        </button>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold">{totalTasks}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Tasks</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold">{progress}%</div>
          <div className="text-xs text-muted-foreground mt-1">Complete</div>
          <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
          <div className="text-xs text-muted-foreground mt-1">Hours Tracked</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold">
            {project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Due Date</div>
        </div>
      </div>
    </div>
  )
}
