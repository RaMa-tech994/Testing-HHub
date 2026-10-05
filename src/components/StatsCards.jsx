import {
  IconAlert,
  IconBolt,
  IconCheck,
  IconClipboard,
  IconInbox,
  IconPlay,
} from './Icons'

const CARDS = [
  { key: 'total', label: 'Visos užduotys', icon: IconClipboard, tone: 'slate' },
  { key: 'notStarted', label: 'Nepradėtos', icon: IconInbox, tone: 'gray' },
  { key: 'inProgress', label: 'Vykdomos', icon: IconPlay, tone: 'blue' },
  { key: 'done', label: 'Atliktos', icon: IconCheck, tone: 'green' },
  { key: 'overdue', label: 'Pavėluotos', icon: IconAlert, tone: 'red' },
  { key: 'critical', label: 'Kritinis prioritetas', icon: IconBolt, tone: 'orange' },
]

export function StatsCards({ stats, activeKey, onSelect }) {
  return (
    <section className="stats-grid" aria-label="Užduočių statistika">
      {CARDS.map((card) => {
        const Icon = card.icon
        const active = activeKey === card.key
        return (
          <button
            key={card.key}
            type="button"
            className={`stat-card tone-${card.tone} ${active ? 'is-active' : ''}`}
            onClick={() => onSelect(card.key)}
          >
            <span className="stat-icon">
              <Icon />
            </span>
            <span className="stat-copy">
              <span className="stat-label">{card.label}</span>
              <span className="stat-value">{stats[card.key]}</span>
            </span>
          </button>
        )
      })}
    </section>
  )
}
