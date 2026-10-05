import { useCallback, useState } from 'react'
import { personRepository } from '../services/personRepository'

export function usePeople() {
  const [people, setPeople] = useState(() => personRepository.list())

  const persist = useCallback((next) => {
    personRepository.saveAll(next)
    setPeople(next)
  }, [])

  const addPerson = useCallback(
    (name) => {
      const trimmed = name?.trim()
      if (!trimmed) {
        throw new Error('Įveskite vardą ir pavardę.')
      }
      const person = personRepository.create(trimmed)
      persist([person, ...people])
      return person
    },
    [people, persist],
  )

  const updatePerson = useCallback(
    (id, name) => {
      const trimmed = name?.trim()
      if (!trimmed) {
        throw new Error('Įveskite vardą ir pavardę.')
      }
      persist(
        people.map((person) =>
          person.id === id ? personRepository.update(person, trimmed) : person,
        ),
      )
    },
    [people, persist],
  )

  const deletePerson = useCallback(
    (id) => {
      persist(people.filter((person) => person.id !== id))
    },
    [people, persist],
  )

  return { people, addPerson, updatePerson, deletePerson }
}
