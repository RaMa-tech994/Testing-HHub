import { useMemo, useState } from 'react'
import { EMPTY_FILTERS } from './constants'
import { Header } from './components/Header'
import { StatsCards } from './components/StatsCards'
import { FilterBar } from './components/FilterBar'
import { TaskTable } from './components/TaskTable'
import { TaskFormDrawer } from './components/TaskFormDrawer'
import { PeopleDrawer } from './components/PeopleDrawer'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Modal } from './components/Modal'
import Calendar from './components/Calendar'
import { Toast } from './components/Toast'
import { useTasks } from './hooks/useTasks'
import { usePeople } from './hooks/usePeople'
import { useToast } from './hooks/useToast'
import { filterAndSortTasks } from './utils/taskHelpers'
import './App.css'

function applyStatFilter(key) {
  if (key === 'total') return { ...EMPTY_FILTERS }
  if (key === 'notStarted') return { ...EMPTY_FILTERS, status: 'not_started' }
  if (key === 'inProgress') return { ...EMPTY_FILTERS, status: 'in_progress' }
  if (key === 'done') return { ...EMPTY_FILTERS, status: 'done' }
  if (key === 'overdue') return { ...EMPTY_FILTERS, overdue: true }
  return { ...EMPTY_FILTERS }
}

function activeStatKey(filters) {
  if (filters.overdue) return 'overdue'
  if (
    filters.status === 'all' &&
    filters.priority === 'all' &&
    filters.assignee === 'all' &&
    !filters.search
  ) {
    return 'total'
  }
  if (filters.status === 'not_started' && filters.priority === 'all') return 'notStarted'
  if (filters.status === 'in_progress' && filters.priority === 'all') return 'inProgress'
  if (filters.status === 'done' && filters.priority === 'all') return 'done'
  return null
}

export default function App() {
  const { tasks, stats, createTask, updateTask, deleteTask, unassignPerson } = useTasks()
  const { people, addPerson, updatePerson, deletePerson } = usePeople()
  const { toast, showToast, hideToast } = useToast()

  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [peopleOpen, setPeopleOpen] = useState(false)
  const [deleteTaskTarget, setDeleteTaskTarget] = useState(null)
  const [deletePersonTarget, setDeletePersonTarget] = useState(null)
  const [notesText, setNotesText] = useState('')
  const [activeView, setActiveView] = useState('tasks')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')

  const visibleTasks = useMemo(
    () => filterAndSortTasks(tasks, filters),
    [tasks, filters],
  )

  const openNewTask = (dueDate = '') => {
    setEditingTask(null)
    setNewTaskDueDate(dueDate)
    setFormOpen(true)
  }

  const handleSaveTask = (payload) => {
    try {
      if (editingTask) {
        updateTask(editingTask.id, payload)
        showToast('Užduotis atnaujinta.')
      } else {
        createTask(payload)
        showToast('Užduotis sukurta.')
      }
      setFormOpen(false)
      setEditingTask(null)
      setNewTaskDueDate('')
    } catch (error) {
      showToast(error.message, 'error')
    }
  }

  const handlePatch = (id, patch) => {
    try {
      updateTask(id, patch)
    } catch (error) {
      showToast(error.message, 'error')
    }
  }

  const confirmDeleteTask = () => {
    deleteTask(deleteTaskTarget.id)
    setDeleteTaskTarget(null)
    showToast('Užduotis ištrinta.')
  }

  const confirmDeletePerson = () => {
    unassignPerson(deletePersonTarget.id)
    deletePerson(deletePersonTarget.id)
    setDeletePersonTarget(null)
    showToast('Asmuo pašalintas.')
  }

  const handleAddPerson = (name) => {
    const person = addPerson(name)
    showToast('Asmuo pridėtas.')
    return person
  }

  const assignedCount = deletePersonTarget
    ? tasks.filter((task) => task.assigneeId === deletePersonTarget.id).length
    : 0

  return (
    <div className="app-shell">
      <Header onNewTask={openNewTask} onOpenPeople={() => setPeopleOpen(true)} />
      <nav className="view-nav" aria-label="Pagrindiniai vaizdai">
        <button type="button" className={`btn ${activeView === 'tasks' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveView('tasks')}>Užduotys</button>
        <button type="button" className={`btn ${activeView === 'calendar' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveView('calendar')}>Kalendorius</button>
      </nav>
      {activeView === 'calendar' ? (
        <Calendar
          tasks={tasks}
          people={people}
          onTaskClick={(task) => { setEditingTask(task); setFormOpen(true) }}
          onNewTask={(date) => openNewTask(date)}
        />
      ) : <>
      <StatsCards
        stats={stats}
        activeKey={activeStatKey(filters)}
        onSelect={(key) => setFilters(applyStatFilter(key))}
      />
      <FilterBar
        filters={filters}
        people={people}
        total={tasks.length}
        shown={visibleTasks.length}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
      />
      <TaskTable
        tasks={visibleTasks}
        people={people}
        onEdit={(task) => {
          setEditingTask(task)
          setFormOpen(true)
        }}
        onDelete={setDeleteTaskTarget}
        onPatch={handlePatch}
        onNewTask={openNewTask}
        onOpenNotes={setNotesText}
      />
      </>}

      <TaskFormDrawer
        open={formOpen}
        task={editingTask}
        initialDueDate={newTaskDueDate}
        people={people}
        onClose={() => {
          setFormOpen(false)
          setEditingTask(null)
          setNewTaskDueDate('')
        }}
        onSave={handleSaveTask}
        onAddPerson={handleAddPerson}
      />

      <PeopleDrawer
        open={peopleOpen}
        people={people}
        tasks={tasks}
        onClose={() => setPeopleOpen(false)}
        onAdd={handleAddPerson}
        onUpdate={(id, name) => {
          updatePerson(id, name)
          showToast('Asmens informacija atnaujinta.')
        }}
        onRequestDelete={setDeletePersonTarget}
      />

      <ConfirmDialog
        open={Boolean(deleteTaskTarget)}
        title="Ištrinti užduotį?"
        message={`Užduotis „${deleteTaskTarget?.title ?? ''}“ bus pašalinta visam laikui.`}
        confirmLabel="Ištrinti"
        danger
        onClose={() => setDeleteTaskTarget(null)}
        onConfirm={confirmDeleteTask}
      />

      <ConfirmDialog
        open={Boolean(deletePersonTarget)}
        title="Ištrinti asmenį?"
        message={
          assignedCount > 0
            ? `${deletePersonTarget?.name} yra priskirtas ${assignedCount} užduotims. Pašalinus asmenį, šiose užduotyse priskyrimas bus nuimtas.`
            : `Asmuo ${deletePersonTarget?.name} bus pašalintas iš sąrašo.`
        }
        confirmLabel={assignedCount > 0 ? 'Pašalinti priskyrimą ir ištrinti' : 'Ištrinti'}
        danger
        onClose={() => setDeletePersonTarget(null)}
        onConfirm={confirmDeletePerson}
      />

      <Modal
        open={Boolean(notesText)}
        title="Pastabos"
        onClose={() => setNotesText('')}
      >
        <p className="notes-full">{notesText}</p>
        <div className="form-actions">
          <button type="button" className="btn btn-primary" onClick={() => setNotesText('')}>
            Uždaryti
          </button>
        </div>
      </Modal>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  )
}
