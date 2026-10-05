import { createId } from '../utils/id'
import { storage } from './storage'

const PEOPLE_KEY = 'taskslist.people'

function isValidPerson(person) {
  return person && typeof person === 'object' && typeof person.id === 'string' && typeof person.name === 'string'
}

function normalizePerson(person) {
  return {
    id: person.id,
    name: person.name,
    createdAt: person.createdAt || new Date().toISOString(),
    updatedAt: person.updatedAt || person.createdAt || new Date().toISOString(),
  }
}

export const personRepository = {
  list() {
    const data = storage.get(PEOPLE_KEY, [])
    if (!Array.isArray(data)) return []
    return data.filter(isValidPerson).map(normalizePerson)
  },

  saveAll(people) {
    const ok = storage.set(PEOPLE_KEY, people)
    if (!ok) {
      throw new Error('Nepavyko išsaugoti asmenų naršyklėje.')
    }
  },

  create(name) {
    const now = new Date().toISOString()
    return {
      id: createId(),
      name: name.trim(),
      createdAt: now,
      updatedAt: now,
    }
  },

  update(person, name) {
    return {
      ...person,
      name: name.trim(),
      updatedAt: new Date().toISOString(),
    }
  },
}
