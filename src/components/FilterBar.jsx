import { PRIORITIES, SORT_OPTIONS, STATUSES } from '../constants'
import { IconSearch } from './Icons'

export function FilterBar({ filters, people, total, shown, onChange, onClear }) {
  const update = (field, value) => onChange({ ...filters, [field]: value })

  return (
    <section className="filter-bar" aria-label="Filtravimas ir paieška">
      <label className="search-field">
        <IconSearch />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="Ieškoti pagal pavadinimą"
          aria-label="Paieška pagal pavadinimą"
        />
      </label>

      <label className="field">
        <span>Statusas</span>
        <select
          value={filters.status}
          onChange={(event) => update('status', event.target.value)}
        >
          <option value="all">Visi statusai</option>
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Prioritetas</span>
        <select
          value={filters.priority}
          onChange={(event) => update('priority', event.target.value)}
        >
          <option value="all">Visi prioritetai</option>
          {PRIORITIES.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Atsakingas asmuo</span>
        <select
          value={filters.assignee}
          onChange={(event) => onChange({ ...filters, assignee: event.target.value })}
        >
          <option value="all">Visi asmenys</option>
          <option value="unassigned">Nepriskirtos</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Rūšiuoti</span>
        <select
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value })}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="filter-meta">
        <p>
          Rodoma <strong>{shown}</strong> iš <strong>{total}</strong>
          {filters.overdue ? ' · pavėluotos' : ''}
        </p>
        <button type="button" className="btn btn-ghost" onClick={onClear}>
          Išvalyti filtrus
        </button>
      </div>
    </section>
  )
}
