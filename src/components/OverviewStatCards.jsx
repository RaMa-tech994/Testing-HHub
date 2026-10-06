import { useMemo } from 'react'
import {
  getCompletionRate,
  getDueThisWeek,
  getDueToday,
  getOverdueTasks,
  getTodayString,
  getWithoutAssignee,
  getWithoutDueDate,
} from '../utils/overviewHelpers'
import {
  IconAlert,
  IconCheck,
  IconClipboard,
  IconInbox,
  IconPlay,
  IconUsers,
} from './Icons'
import './OverviewStatCards.css'

export function OverviewStatCards({ tasks, people }) {
  const stats = useMemo(() => {
    const today = getTodayString()
    return {
      overdue: getOverdueTasks(tasks, today).length,
      dueToday: getDueToday(tasks, today).length,
      dueThisWeek: getDueThisWeek(tasks, today).length,
      completionRate: getCompletionRate(tasks),
      withoutDueDate: getWithoutDueDate(tasks).length,
      withoutAssignee: getWithoutAssignee(tasks, people).length,
    }
  }, [tasks, people])

  const cards = [
    {
      key: 'overdue',
      label: 'Vėluoja',
      value: stats.overdue,
      icon: IconAlert,
      tone: stats.overdue > 0 ? 'red' : 'green',
    },
    { key: 'dueToday', label: 'Šiandien', value: stats.dueToday, icon: IconPlay, tone: 'blue' },
    { key: 'dueThisWeek', label: 'Šią savaitę', value: stats.dueThisWeek, icon: IconClipboard, tone: 'orange' },
    { key: 'completionRate', label: 'Atlikta (%)', value: `${stats.completionRate}%`, icon: IconCheck, tone: 'green' },
    { key: 'withoutDueDate', label: 'Be termino', value: stats.withoutDueDate, icon: IconInbox, tone: 'gray' },
    { key: 'withoutAssignee', label: 'Be atsakingo', value: stats.withoutAssignee, icon: IconUsers, tone: 'slate' },
  ]

  return (
    <section className="stats-grid overview-stat-grid" aria-label="Apžvalgos rodikliai">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <article key={card.key} className={`stat-card overview-stat-card tone-${card.tone}`}>
            <span className="stat-icon">
              <Icon />
            </span>
            <span className="stat-copy">
              <span className="stat-label">{card.label}</span>
              <span className="stat-value">{card.value}</span>
            </span>
          </article>
        )
      })}
    </section>
  )
}
