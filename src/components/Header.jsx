import { IconPlus, IconUsers } from './Icons'

export function Header({ onNewTask, onOpenPeople }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">SaaS dashboard</p>
        <h1>Užduočių valdymas</h1>
        <p className="subtitle">Kurkite, priskirkite ir sekite komandos darbus vienoje vietoje.</p>
      </div>
      <div className="header-actions">
        <button type="button" className="btn btn-primary" onClick={onNewTask}>
          <IconPlus />
          Nauja užduotis
        </button>
        <button type="button" className="btn btn-ghost" onClick={onOpenPeople}>
          <IconUsers />
          Atsakingi asmenys
        </button>
      </div>
    </header>
  )
}
