import { useState } from 'react'
import { Modal } from './Modal'
import { IconEdit, IconTrash } from './Icons'

export function PeopleDrawer({
  open,
  people,
  tasks,
  onClose,
  onAdd,
  onUpdate,
  onRequestDelete,
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  const assignedCount = (personId) =>
    tasks.filter((task) => task.assigneeId === personId).length

  const handleAdd = (event) => {
    event.preventDefault()
    try {
      onAdd(name)
      setName('')
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (person) => {
    setEditingId(person.id)
    setEditName(person.name)
    setError('')
  }

  const saveEdit = (id) => {
    try {
      onUpdate(id, editName)
      setEditingId(null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Modal open={open} side wide title="Atsakingi asmenys" onClose={onClose}>
      <form className="inline-add" onSubmit={handleAdd}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Vardas ir pavardė"
        />
        <button type="submit" className="btn btn-primary">
          Pridėti
        </button>
      </form>
      {error ? <em className="field-error">{error}</em> : null}

      {people.length === 0 ? (
        <div className="empty-mini">
          Dar nėra atsakingų asmenų. Pridėkite pirmą komandos narį.
        </div>
      ) : (
        <ul className="people-list">
          {people.map((person) => (
            <li key={person.id} className="people-item">
              {editingId === person.id ? (
                <div className="inline-add">
                  <input
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                  />
                  <button type="button" className="btn btn-primary" onClick={() => saveEdit(person.id)}>
                    Saugoti
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setEditingId(null)}>
                    Atšaukti
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <strong>{person.name}</strong>
                    <p className="muted">Priskirta užduočių: {assignedCount(person.id)}</p>
                  </div>
                  <div className="row-actions">
                    <button type="button" className="icon-btn" onClick={() => startEdit(person)} aria-label="Redaguoti asmenį">
                      <IconEdit />
                    </button>
                    <button
                      type="button"
                      className="icon-btn danger"
                      onClick={() => onRequestDelete(person)}
                      aria-label="Ištrinti asmenį"
                    >
                      <IconTrash />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
