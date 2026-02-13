import { notFound } from 'next/navigation'
import { getTask } from '@/actions/tasks'
import { TaskDetail } from './TaskDetail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params
  const task = await getTask(id)

  if (!task) {
    notFound()
  }

  return <TaskDetail task={task} />
}
