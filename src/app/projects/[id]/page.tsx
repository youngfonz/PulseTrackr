import { notFound } from 'next/navigation'
import { getProject, getClientsForSelect } from '@/actions/projects'
import { ProjectHeader } from './ProjectHeader'
import { ProjectTabs } from './ProjectTabs'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const [project, clients] = await Promise.all([
    getProject(id),
    getClientsForSelect(),
  ])

  if (!project) {
    notFound()
  }

  const completedTasks = project.tasks.filter((t) => t.completed).length
  const totalTasks = project.tasks.length
  const totalHours = project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0)

  return (
    <div className="max-w-7xl mx-auto">
      <ProjectHeader
        project={project}
        clients={clients}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        totalHours={totalHours}
      />
      <ProjectTabs
        projectId={project.id}
        tasks={project.tasks}
        timeEntries={project.timeEntries}
        images={project.images}
      />
    </div>
  )
}
