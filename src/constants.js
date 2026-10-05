export const STATUSES = [
  { value: 'not_started', label: 'Nepradėta', tone: 'gray' },
  { value: 'in_progress', label: 'Vykdoma', tone: 'blue' },
  { value: 'done', label: 'Atlikta', tone: 'green' },
]

export const PRIORITIES = [
  { value: 'low', label: 'Žemas', tone: 'gray', rank: 1 },
  { value: 'medium', label: 'Vidutinis', tone: 'blue', rank: 2 },
  { value: 'high', label: 'Aukštas', tone: 'orange', rank: 3 },
  { value: 'critical', label: 'Kritinis', tone: 'red', rank: 4 },
]

export const DEFAULT_STATUS = 'not_started'
export const DEFAULT_PRIORITY = 'medium'

export const SORT_OPTIONS = [
  { value: 'dueDate-asc', label: 'Terminas (seniausias)' },
  { value: 'dueDate-desc', label: 'Terminas (naujausias)' },
  { value: 'priority-desc', label: 'Prioritetas (aukščiausias)' },
  { value: 'createdAt-desc', label: 'Sukūrimo data (naujausia)' },
  { value: 'createdAt-asc', label: 'Sukūrimo data (seniausia)' },
]

export const EMPTY_FILTERS = {
  search: '',
  status: 'all',
  priority: 'all',
  assignee: 'all',
  overdue: false,
  sort: 'createdAt-desc',
}

export function statusLabel(value) {
  return STATUSES.find((item) => item.value === value)?.label ?? value
}

export function priorityLabel(value) {
  return PRIORITIES.find((item) => item.value === value)?.label ?? value
}

export function statusTone(value) {
  return STATUSES.find((item) => item.value === value)?.tone ?? 'gray'
}

export function priorityTone(value) {
  return PRIORITIES.find((item) => item.value === value)?.tone ?? 'gray'
}

export function priorityRank(value) {
  return PRIORITIES.find((item) => item.value === value)?.rank ?? 0
}
