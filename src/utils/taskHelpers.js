import { priorityRank } from '../constants'
import { isTaskOverdue } from './dates'

export function getTaskStats(tasks) {
  return tasks.reduce(
    (stats, task) => {
      stats.total += 1
      if (task.status === 'not_started') stats.notStarted += 1
      if (task.status === 'in_progress') stats.inProgress += 1
      if (task.status === 'done') stats.done += 1
      if (isTaskOverdue(task)) stats.overdue += 1
      if (task.priority === 'critical') stats.critical += 1
      return stats
    },
    {
      total: 0,
      notStarted: 0,
      inProgress: 0,
      done: 0,
      overdue: 0,
      critical: 0,
    },
  )
}

export function filterAndSortTasks(tasks, filters) {
  const search = filters.search.trim().toLowerCase()

  const filtered = tasks.filter((task) => {
    if (search && !task.title.toLowerCase().includes(search)) return false
    if (filters.status !== 'all' && task.status !== filters.status) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false
    }
    if (filters.assignee === 'unassigned' && task.assigneeId) return false
    if (
      filters.assignee !== 'all' &&
      filters.assignee !== 'unassigned' &&
      task.assigneeId !== filters.assignee
    ) {
      return false
    }
    if (filters.overdue && !isTaskOverdue(task)) return false
    return true
  })

  const [sortField, sortDir] = filters.sort.split('-')
  const direction = sortDir === 'asc' ? 1 : -1

  return [...filtered].sort((a, b) => {
    if (sortField === 'priority') {
      return (priorityRank(a.priority) - priorityRank(b.priority)) * direction
    }

    if (sortField === 'dueDate') {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      if (a.dueDate === b.dueDate) return 0
      return a.dueDate > b.dueDate ? direction : -direction
    }

    const left = a.createdAt || ''
    const right = b.createdAt || ''
    if (left === right) return 0
    return left > right ? direction : -direction
  })
}

export function getPersonName(people, assigneeId) {
  if (!assigneeId) return 'Nepriskirta'
  return people.find((person) => person.id === assigneeId)?.name ?? 'Nepriskirta'
}
