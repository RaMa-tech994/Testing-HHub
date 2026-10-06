import { STATUSES } from '../constants'
import { isTaskOverdue } from './dates'

const DONE_STATUS = STATUSES.find((status) => status.label === 'Atlikta').value

function isActiveTask(task) {
  return task.status !== DONE_STATUS
}

export function getTodayString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getWeekRange(today = getTodayString()) {
  const [year, month, day] = today.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const dayOfWeek = (date.getDay() + 6) % 7
  const monday = new Date(year, month - 1, day - dayOfWeek)
  const sunday = new Date(year, month - 1, day + (6 - dayOfWeek))

  const toYmd = (value) => {
    const rangeYear = value.getFullYear()
    const rangeMonth = String(value.getMonth() + 1).padStart(2, '0')
    const rangeDay = String(value.getDate()).padStart(2, '0')
    return `${rangeYear}-${rangeMonth}-${rangeDay}`
  }

  return { start: toYmd(monday), end: toYmd(sunday) }
}

export function getOverdueTasks(tasks, today = getTodayString()) {
  return tasks.filter((task) => isTaskOverdue(task, today))
}

export function getDueToday(tasks, today = getTodayString()) {
  return tasks.filter((task) => isActiveTask(task) && task.dueDate === today)
}

export function getDueThisWeek(tasks, today = getTodayString()) {
  const { start, end } = getWeekRange(today)
  return tasks.filter(
    (task) =>
      isActiveTask(task) && task.dueDate >= start && task.dueDate <= end,
  )
}

export function getCompletionRate(tasks) {
  if (tasks.length === 0) return 0
  const completed = tasks.filter((task) => task.status === DONE_STATUS).length
  return Math.round((completed / tasks.length) * 100)
}

export function getWithoutDueDate(tasks) {
  return tasks.filter((task) => isActiveTask(task) && !task.dueDate)
}

export function getWithoutAssignee(tasks, people) {
  const personIds = new Set(people.map((person) => person.id))
  return tasks.filter(
    (task) =>
      isActiveTask(task) && (!task.assigneeId || !personIds.has(task.assigneeId)),
  )
}

export function getWorkloadByPerson(tasks, people, today = getTodayString()) {
  const workload = people.map((person) => {
    const personTasks = tasks.filter((task) => task.assigneeId === person.id)
    return {
      id: person.id,
      name: person.name,
      active: personTasks.filter(isActiveTask).length,
      done: personTasks.filter((task) => task.status === DONE_STATUS).length,
      overdue: getOverdueTasks(personTasks, today).length,
    }
  })

  const knownPersonIds = new Set(people.map((person) => person.id))
  const unassignedTasks = tasks.filter(
    (task) => !task.assigneeId || !knownPersonIds.has(task.assigneeId),
  )
  if (unassignedTasks.length > 0) {
    workload.push({
      id: null,
      name: 'Nepriskirta',
      active: unassignedTasks.filter(isActiveTask).length,
      done: unassignedTasks.filter((task) => task.status === DONE_STATUS).length,
      overdue: getOverdueTasks(unassignedTasks, today).length,
    })
  }

  const assignedWorkload = workload.filter((person) => person.id !== null)
  const unassignedWorkload = workload.filter((person) => person.id === null)
  assignedWorkload.sort((a, b) => b.active - a.active)
  return [...assignedWorkload, ...unassignedWorkload]
}

export function getUpcomingTasks(tasks, today = getTodayString(), limit = 5) {
  return tasks
    .filter(
      (task) =>
        isActiveTask(task) && task.dueDate && task.dueDate >= today,
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, limit)
}
