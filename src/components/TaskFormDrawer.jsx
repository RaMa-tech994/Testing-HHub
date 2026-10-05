import { useEffect, useState } from 'react'
import { DEFAULT_PRIORITY, DEFAULT_STATUS, PRIORITIES, STATUSES } from '../constants'
import { Modal } from './Modal'

const EMPTY_FORM = {
  title: '',
  dueDate: '',
  assigneeId: '',
  priority: DEFAULT_PRIORITY,
  status: DEFAULT_STATUS,
  notes: '',
}

export function TaskFormDrawer({
  open,
  task,
  initialDueDate = '',
  people,
  onClose,
  onSave,
  onAddPerson,
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [newPerson, setNewPerson] = useState('')
  const isEdit = Boolean(task)

  useEffect(() => {
    if (!open) return
    setErrors({})
    setNewPerson('')
    if (task) {
      setForm({
        title: task.title,
        dueDate: task.dueDate || '',
        assigneeId: task.assigneeId || '',
        priority: task.priority,
        status: task.status,
        notes: task.notes || '',
      })
    } else {
      setForm({ ...EMPTY_FORM, dueDate: initialDueDate })
    }
  }, [open, task, initialDueDate])

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleAddPerson = () => {
    try {
      const person = onAddPerson(newPerson)
      setForm((current) => ({ ...current, assigneeId: person.id }))
      setNewPerson('')
      setErrors((current) => ({ ...current, person: '' }))
    } catch (error) {
      setErrors((current) => ({ ...current, person: error.message }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setErrors({ title: 'Užduoties pavadinimas yra privalomas.' })
      return
    }
    onSave({
      title: form.title.trim(),
      dueDate: form.dueDate || null,
      assigneeId: form.assigneeId || null,
      priority: form.priority,
      status: isEdit ? form.status : DEFAULT_STATUS,
      notes: form.notes,
    })
  }

  return (
    <Modal
      open={open}
      side
      wide
      title={isEdit ? 'Redaguoti užduotį' : 'Nauja užduotis'}
      onClose={onClose}
    >
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Užduoties pavadinimas *</span>
          <input
            value={form.title}
            onChange={(event) => setField('title', event.target.value)}
            placeholder="Pvz. Paruošti savaitės ataskaitą"
          />
          {errors.title ? <em className="field-error">{errors.title}</em> : null}
        </label>

        <div className="form-grid">
          <label className="field">
            <span>Atlikimo terminas</span>
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => setField('dueDate', event.target.value)}
            />
          </label>

          <label className="field">
            <span>Prioritetas</span>
            <select
              value={form.priority}
              onChange={(event) => setField('priority', event.target.value)}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isEdit ? (
          <label className="field">
            <span>Statusas</span>
            <select
              value={form.status}
              onChange={(event) => setField('status', event.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="hint">Nauja užduotis bus išsaugota su statusu „Nepradėta“.</p>
        )}

        <label className="field">
          <span>Atsakingas asmuo</span>
          <select
            value={form.assigneeId}
            onChange={(event) => setField('assigneeId', event.target.value)}
          >
            <option value="">Nepriskirta</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </label>

        <div className="inline-add">
          <input
            value={newPerson}
            onChange={(event) => setNewPerson(event.target.value)}
            placeholder="Pridėti naują asmenį"
          />
          <button type="button" className="btn btn-ghost" onClick={handleAddPerson}>
            Pridėti
          </button>
        </div>
        {errors.person ? <em className="field-error">{errors.person}</em> : null}

        <label className="field">
          <span>Pastabos</span>
          <textarea
            rows="5"
            value={form.notes}
            onChange={(event) => setField('notes', event.target.value)}
            placeholder="Papildoma informacija, kontekstas, nuorodos"
          />
        </label>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Atšaukti
          </button>
          <button type="submit" className="btn btn-primary">
            Išsaugoti užduotį
          </button>
        </div>
      </form>
    </Modal>
  )
}
