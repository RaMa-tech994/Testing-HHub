import { useCallback, useMemo, useState } from 'react'
import { taskRepository } from '../services/taskRepository'
import { getTaskStats } from '../utils/taskHelpers'

export function useTasks() {
  const [tasks, setTasks] = useState(() => taskRepository.list())
  const [error, setError] = useState('')

  const persist = useCallback((next) => {
    taskRepository.saveAll(next)
    setTasks(next)
  }, [])

  const createTask = useCallback(
    (input) => {
      setError('')
      const title = input.title?.trim()
      if (!title) {
        throw new Error('Įveskite užduoties pavadinimą.')
      }
      const next = [taskRepository.create({ ...input, title }), ...tasks]
      persist(next)
    },
    [persist, tasks],
  )

  const updateTask = useCallback(
    (id, patch) => {
      setError('')
      if (patch.title !== undefined && !patch.title.trim()) {
        throw new Error('Įveskite užduoties pavadinimą.')
      }
      const next = tasks.map((task) =>
        task.id === id
          ? taskRepository.update(task, {
              ...patch,
              title: patch.title !== undefined ? patch.title.trim() : task.title,
              notes: patch.notes !== undefined ? patch.notes.trim() : task.notes,
            })
          : task,
      )
      persist(next)
    },
    [persist, tasks],
  )

  const deleteTask = useCallback(
    (id) => {
      persist(tasks.filter((task) => task.id !== id))
    },
    [persist, tasks],
  )

  const unassignPerson = useCallback(
    (personId) => {
      const next = tasks.map((task) =>
        task.assigneeId === personId
          ? taskRepository.update(task, { assigneeId: null })
          : task,
      )
      persist(next)
    },
    [persist, tasks],
  )

  const stats = useMemo(() => getTaskStats(tasks), [tasks])

  return {
    tasks,
    stats,
    error,
    setError,
    createTask,
    updateTask,
    deleteTask,
    unassignPerson,
  }
}
