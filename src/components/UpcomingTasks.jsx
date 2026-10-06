import { useMemo } from 'react'
import { priorityLabel, priorityTone } from '../constants'
import { formatLtDate } from '../utils/dates'
import { getPersonName } from '../utils/taskHelpers'
import { getUpcomingTasks } from '../utils/overviewHelpers'
import { Badge } from './Badge'
import './UpcomingTasks.css'

export function UpcomingTasks({ tasks, people, onTaskClick }) {
  const upcomingTasks = useMemo(() => getUpcomingTasks(tasks), [tasks])

  return (
    <section className="upcoming-panel" aria-labelledby="upcoming-title">
      <h3 id="upcoming-title">Artimiausi terminai</h3>
      {upcomingTasks.length > 0 ? (
        <ul className="upcoming-list">
          {upcomingTasks.map((task) => (
            <li key={task.id}>
              <button
                type="button"
                className="upcoming-task"
                onClick={() => onTaskClick(task)}
              >
                <span className="upcoming-task-date">{formatLtDate(task.dueDate)}</span>
                <span className="upcoming-task-title">{task.title}</span>
                <span className="upcoming-task-assignee">
                  {getPersonName(people, task.assigneeId)}
                </span>
                <span className="upcoming-task-priority">
                  <Badge tone={priorityTone(task.priority)}>
                    {priorityLabel(task.priority)}
                  </Badge>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="upcoming-empty">Artimiausių terminų nėra.</p>
      )}
    </section>
  )
}
