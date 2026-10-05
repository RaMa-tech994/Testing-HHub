export function todayYmd() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatLtDate(ymd) {
  if (!ymd || typeof ymd !== 'string') return '—'
  const [year, month, day] = ymd.split('-')
  if (!year || !month || !day) return '—'
  return `${day}.${month}.${year}`
}

export function formatLtDateTime(iso) {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  const ymd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
  const time = [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
  ].join(':')
  return `${formatLtDate(ymd)} ${time}`
}

export function isTaskOverdue(task, today = todayYmd()) {
  if (!task?.dueDate || task.status === 'done') return false
  return task.dueDate < today
}
