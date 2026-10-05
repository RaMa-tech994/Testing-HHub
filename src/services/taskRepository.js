import { DEFAULT_PRIORITY, DEFAULT_STATUS } from '../constants'
import { createId } from '../utils/id'
import { storage } from './storage'

const TASKS_KEY = 'taskslist.tasks'

function isValidTask(task) {
  return task && typeof task === 'object' && typeof task.id === 'string' && typeof task.title === 'string'
}

function normalizeTask(task) {
  return {
    id: task.id,
    title: task.title,
    dueDate: task.dueDate || null,
    assigneeId: task.assigneeId || null,
    priority: task.priority || DEFAULT_PRIORITY,
    status: task.status || DEFAULT_STATUS,
    notes: task.notes || '',
    createdAt: task.createdAt || new Date().toISOString(),
    updatedAt: task.updatedAt || task.createdAt || new Date().toISOString(),
  }
}

export const taskRepository = {
  list() {
    const data = storage.get(TASKS_KEY, [])
    if (!Array.isArray(data)) return []
    return data.filter(isValidTask).map(normalizeTask)
  },

  saveAll(tasks) {
    const ok = storage.set(TASKS_KEY, tasks)
    if (!ok) {
      throw new Error('Nepavyko išsaugoti užduočių naršyklėje.')
    }
  },

  create(input) {
    const now = new Date().toISOString()
    return {
      id: createId(),
      title: input.title.trim(),
      dueDate: input.dueDate || null,
      assigneeId: input.assigneeId || null,
      priority: input.priority || DEFAULT_PRIORITY,
      status: DEFAULT_STATUS,
      notes: (input.notes || '').trim(),
      createdAt: now,
      updatedAt: now,
    }
  },

  update(task, patch) {
    return {
      ...task,
      ...patch,
      id: task.id,
      createdAt: task.createdAt,
      updatedAt: new Date().toISOString(),
    }
  },
}
