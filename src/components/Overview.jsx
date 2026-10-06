import './Overview.css'
import { OverviewStatCards } from './OverviewStatCards'

export function Overview({ tasks, people, onTaskClick }) {
  return (
    <section
      className="overview-page"
      aria-label="Apžvalga"
      data-task-count={tasks.length}
      data-people-count={people.length}
      data-task-click-enabled={Boolean(onTaskClick)}
    >
      <h2>Apžvalga</h2>
      <OverviewStatCards tasks={tasks} people={people} />
    </section>
  )
}
