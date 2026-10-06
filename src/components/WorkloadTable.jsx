import { useMemo } from 'react'
import { getWorkloadByPerson } from '../utils/overviewHelpers'
import './WorkloadTable.css'

export function WorkloadTable({ tasks, people }) {
  const workload = useMemo(
    () => getWorkloadByPerson(tasks, people),
    [tasks, people],
  )

  if (workload.length === 0) {
    return (
      <section className="workload-panel" aria-labelledby="workload-title">
        <h3 id="workload-title">Komandos apkrova</h3>
        <p className="workload-empty">Dar nėra atsakingų asmenų ar užduočių.</p>
      </section>
    )
  }

  return (
    <section className="workload-panel" aria-labelledby="workload-title">
      <h3 id="workload-title">Komandos apkrova</h3>
      <div className="workload-table-wrap">
        <table className="workload-table">
          <thead>
            <tr>
              <th scope="col">Asmuo</th>
              <th scope="col">Aktyvios</th>
              <th scope="col">Atliktos</th>
              <th scope="col">Vėluoja</th>
            </tr>
          </thead>
          <tbody>
            {workload.map((person) => (
              <tr key={person.id ?? 'unassigned'}>
                <th scope="row">{person.name}</th>
                <td>{person.active}</td>
                <td>{person.done}</td>
                <td className={person.overdue > 0 ? 'workload-overdue' : undefined}>
                  {person.overdue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
