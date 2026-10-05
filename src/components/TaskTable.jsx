import { PRIORITIES, STATUSES, priorityTone, statusTone } from '../constants'
import { formatLtDate } from '../utils/dates'
import { getPersonName } from '../utils/taskHelpers'
import { isTaskOverdue } from '../utils/dates'
import { Badge } from './Badge'
import { IconEdit, IconPlus, IconTrash } from './Icons'

function NotesCell({ notes, onOpen }) {
  if (!notes) return <span className="muted">—</span>
  const short = notes.length > 72 ? `${notes.slice(0, 72)}…` : notes
  return (
    <button type="button" className="notes-preview" onClick={() => onOpen(notes)} title={notes}>
      {short}
    </button>
  )
}

function TaskFields({ task, people, onPatch }) {
  return (
    <>
      <select
        className="table-select"
        value={task.assigneeId || ''}
        onChange={(event) => onPatch(task.id, { assigneeId: event.target.value || null })}
        aria-label="Atsakingas asmuo"
      >
        <option value="">Nepriskirta</option>
        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <select
        className="table-select"
        value={task.priority}
        onChange={(event) => onPatch(task.id, { priority: event.target.value })}
        aria-label="Prioritetas"
      >
        {PRIORITIES.map((priority) => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </select>
      <select
        className="table-select"
        value={task.status}
        onChange={(event) => onPatch(task.id, { status: event.target.value })}
        aria-label="Statusas"
      >
        {STATUSES.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      <input
        className="table-date"
        type="date"
        value={task.dueDate || ''}
        onChange={(event) => onPatch(task.id, { dueDate: event.target.value || null })}
        aria-label="Atlikimo terminas"
      />
    </>
  )
}

export function TaskTable({
  tasks,
  people,
  onEdit,
  onDelete,
  onPatch,
  onNewTask,
  onOpenNotes,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>Užduočių nerasta</h3>
        <p>Sukurkite pirmą užduotį arba pakeiskite filtrus, kad pamatytumėte rezultatus.</p>
        <button type="button" className="btn btn-primary" onClick={onNewTask}>
          <IconPlus />
          Nauja užduotis
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="table-wrap">
        <table className="task-table">
          <thead>
            <tr>
              <th>Užduoties pavadinimas</th>
              <th>Atlikimo terminas</th>
              <th>Atsakingas asmuo</th>
              <th>Prioritetas</th>
              <th>Statusas</th>
              <th>Pastabos</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const overdue = isTaskOverdue(task)
              return (
                <tr
                  key={task.id}
                  className={`${task.status === 'done' ? 'is-done' : ''} ${overdue ? 'is-overdue' : ''}`}
                >
                  <td>
                    <div className="title-cell">
                      <strong>{task.title}</strong>
                      {overdue ? <span className="overdue-dot">Pavėluota</span> : null}
                    </div>
                  </td>
                  <td>
                    <div className="stack">
                      <span>{formatLtDate(task.dueDate)}</span>
                      <input
                        className="table-date"
                        type="date"
                        value={task.dueDate || ''}
                        onChange={(event) =>
                          onPatch(task.id, { dueDate: event.target.value || null })
                        }
                        aria-label={`Keisti terminą: ${task.title}`}
                      />
                    </div>
                  </td>
                  <td>
                    <select
                      className="table-select"
                      value={task.assigneeId || ''}
                      onChange={(event) =>
                        onPatch(task.id, { assigneeId: event.target.value || null })
                      }
                      aria-label={`Keisti atsakingą asmenį: ${task.title}`}
                    >
                      <option value="">Nepriskirta</option>
                      {people.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.name}
                        </option>
                      ))}
                    </select>
                    <span className="sr-only">{getPersonName(people, task.assigneeId)}</span>
                  </td>
                  <td>
                    <div className="stack">
                      <Badge tone={priorityTone(task.priority)}>
                        {PRIORITIES.find((item) => item.value === task.priority)?.label}
                      </Badge>
                      <select
                        className="table-select"
                        value={task.priority}
                        onChange={(event) => onPatch(task.id, { priority: event.target.value })}
                        aria-label={`Keisti prioritetą: ${task.title}`}
                      >
                        {PRIORITIES.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="stack">
                      <Badge tone={statusTone(task.status)}>
                        {STATUSES.find((item) => item.value === task.status)?.label}
                      </Badge>
                      <select
                        className="table-select"
                        value={task.status}
                        onChange={(event) => onPatch(task.id, { status: event.target.value })}
                        aria-label={`Keisti statusą: ${task.title}`}
                      >
                        {STATUSES.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <NotesCell notes={task.notes} onOpen={onOpenNotes} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="icon-btn" onClick={() => onEdit(task)} aria-label="Redaguoti">
                        <IconEdit />
                      </button>
                      <button
                        type="button"
                        className="icon-btn danger"
                        onClick={() => onDelete(task)}
                        aria-label="Ištrinti"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="card-list">
        {tasks.map((task) => {
          const overdue = isTaskOverdue(task)
          return (
            <article
              key={task.id}
              className={`task-card ${task.status === 'done' ? 'is-done' : ''} ${overdue ? 'is-overdue' : ''}`}
            >
              <div className="task-card-head">
                <h3>{task.title}</h3>
                {overdue ? <span className="overdue-dot">Pavėluota</span> : null}
              </div>
              <div className="badge-row">
                <Badge tone={priorityTone(task.priority)}>
                  {PRIORITIES.find((item) => item.value === task.priority)?.label}
                </Badge>
                <Badge tone={statusTone(task.status)}>
                  {STATUSES.find((item) => item.value === task.status)?.label}
                </Badge>
              </div>
              <p className="muted">Terminas: {formatLtDate(task.dueDate)}</p>
              <p className="muted">Atsakingas: {getPersonName(people, task.assigneeId)}</p>
              {task.notes ? <NotesCell notes={task.notes} onOpen={onOpenNotes} /> : null}
              <div className="card-fields">
                <TaskFields task={task} people={people} onPatch={onPatch} />
              </div>
              <div className="row-actions">
                <button type="button" className="btn btn-ghost" onClick={() => onEdit(task)}>
                  Redaguoti
                </button>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(task)}>
                  Ištrinti
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
