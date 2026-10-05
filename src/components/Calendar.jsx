
import { useMemo, useState } from "react";
import "./Calendar.css";

const weekdays = ["Pr", "An", "Tr", "Kt", "Pn", "Št", "Sk"];

const priorityLabels = {
  high: "Aukštas",
  medium: "Vidutinis",
  low: "Žemas",
};

const statusLabels = {
  todo: "Nepradėta",
  inProgress: "Vykdoma",
  done: "Atlikta",
};

const priorityColors = {
  high: "orange",
  medium: "blue",
  low: "green",
};

const defaultTasks = [
  {
    id: 1,
    title: "BBB",
    dueDate: "2026-10-09",
    priority: "high",
    status: "todo",
    assignee: "Nepriskirta",
  },
  {
    id: 2,
    title: "AAA",
    dueDate: "2026-10-15",
    priority: "medium",
    status: "todo",
    assignee: "Nepriskirta",
  },
  {
    id: 3,
    title: "Sukurti prisijungimo sistemą",
    dueDate: "2026-10-09",
    priority: "high",
    status: "inProgress",
    assignee: "Jonas D.",
  },
  {
    id: 4,
    title: "Atnaujinti dizainą",
    dueDate: "2026-10-12",
    priority: "low",
    status: "done",
    assignee: "Petras J.",
  },
];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isSameDate(date1, date2) {
  return formatDate(date1) === formatDate(date2);
}

export default function Calendar({
  tasks = defaultTasks,
  onTaskClick,
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  // Kalendoriaus dienų generavimas
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Pirmadienis = 0, sekmadienis = 6
    const startOffset = (firstDay.getDay() + 6) % 7;

    const totalDays = Math.ceil(
      (startOffset + lastDay.getDate()) / 7
    ) * 7;

    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(year, month, index - startOffset + 1);

      return {
        date,
        dateString: formatDate(date),
        isCurrentMonth: date.getMonth() === month,
        isToday: isSameDate(date, today),
      };
    });
  }, [currentMonth]);

  // Pasirinktos dienos užduotys
  const selectedTasks = useMemo(() => {
    return tasks.filter((task) => task.dueDate === selectedDate);
  }, [tasks, selectedDate]);

  // Mėnesio užduočių skaičius
  const monthTasks = tasks.filter((task) => {
    const date = parseDate(task.dueDate);

    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  });

  function changeMonth(direction) {
    setCurrentMonth((prev) => {
      return new Date(
        prev.getFullYear(),
        prev.getMonth() + direction,
        1
      );
    });
  }

  function goToToday() {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(formatDate(today));
  }

  function getDayTasks(dateString) {
    return tasks.filter((task) => task.dueDate === dateString);
  }

  return (
    <div className="calendar-container">

      {/* Viršutinė dalis */}
      <div className="calendar-header">
        <div>
          <h2>Užduočių kalendorius</h2>
          <p>Peržiūrėkite suplanuotas užduotis pagal dieną.</p>
        </div>

        <button className="calendar-today-btn" onClick={goToToday}>
          Šiandien
        </button>
      </div>

      <div className="calendar-layout">

        {/* Kalendorius */}
        <div className="calendar-main">

          <div className="calendar-month-header">
            <div className="calendar-month-navigation">
              <button
                onClick={() => changeMonth(-1)}
                aria-label="Ankstesnis mėnuo"
              >
                ‹
              </button>

              <h3>
                {currentMonth.toLocaleDateString("lt-LT", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                onClick={() => changeMonth(1)}
                aria-label="Kitas mėnuo"
              >
                ›
              </button>
            </div>

            <span className="calendar-task-count">
              {monthTasks.length} užduot.
            </span>
          </div>

          {/* Savaitės dienos */}
          <div className="calendar-grid calendar-weekdays">
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Kalendoriaus dienos */}
          <div className="calendar-grid calendar-days">
            {calendarDays.map((day) => {
              const dayTasks = getDayTasks(day.dateString);
              const isSelected = selectedDate === day.dateString;

              return (
                <button
                  key={day.dateString}
                  className={[
                    "calendar-day",
                    !day.isCurrentMonth ? "outside-month" : "",
                    day.isToday ? "today" : "",
                    isSelected ? "selected" : "",
                  ].join(" ")}
                  onClick={() => setSelectedDate(day.dateString)}
                  aria-label={`${day.date.getDate()} ${dayTasks.length} užduotys`}
                  aria-pressed={isSelected}
                >
                  <span className="calendar-day-number">
                    {day.date.getDate()}
                  </span>

                  {dayTasks.length > 0 && (
                    <div className="calendar-day-indicators">
                      {dayTasks.slice(0, 3).map((task) => (
                        <span
                          key={task.id}
                          className={`calendar-dot ${priorityColors[task.priority] || "blue"}`}
                        />
                      ))}

                      {dayTasks.length > 3 && (
                        <span className="calendar-more">
                          +{dayTasks.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {dayTasks.length > 0 && (
                    <span className="calendar-day-task-count">
                      {dayTasks.length} užduot.
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="calendar-legend">
            <span>
              <i className="calendar-dot orange" />
              Aukštas prioritetas
            </span>
            <span>
              <i className="calendar-dot blue" />
              Vidutinis
            </span>
            <span>
              <i className="calendar-dot green" />
              Žemas
            </span>
          </div>
        </div>

        {/* Dešinės pusės užduotys */}
        <aside className="calendar-sidebar">

          <div className="calendar-sidebar-header">
            <div>
              <span className="calendar-sidebar-label">
                PASIRINKTA DIENA
              </span>

              <h3>
                {parseDate(selectedDate).toLocaleDateString("lt-LT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            </div>

            <span className="calendar-sidebar-total">
              {selectedTasks.length}
            </span>
          </div>

          <div className="calendar-task-list">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className="calendar-task-card"
                  onClick={() => onTaskClick?.(task)}
                  role={onTaskClick ? "button" : undefined}
                  tabIndex={onTaskClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      onTaskClick &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      onTaskClick(task);
                    }
                  }}
                >
                  <div className="calendar-task-card-top">
                    <span
                      className={`calendar-priority ${priorityColors[task.priority] || "blue"}`}
                    >
                      {priorityLabels[task.priority] || task.priority}
                    </span>

                    <span className="calendar-task-id">
                      #{task.id}
                    </span>
                  </div>

                  <h4>{task.title}</h4>

                  <div className="calendar-task-info">
                    <span>◷ {task.dueDate.split("-").reverse().join(".")}</span>
                    <span>♙ {task.assignee}</span>
                  </div>

                  <div className="calendar-task-footer">
                    <span className={`calendar-status ${task.status}`}>
                      {statusLabels[task.status] || task.status}
                    </span>

                    {onTaskClick && <span>→</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="calendar-empty">
                <div className="calendar-empty-icon">✓</div>
                <h4>Nėra užduočių</h4>
                <p>
                  Šiai dienai nėra suplanuotų užduočių.
                </p>
              </div>
            )}
          </div>

          <div className="calendar-sidebar-footer">
            Iš viso šį mėnesį: <strong>{monthTasks.length}</strong> užduot.
          </div>

        </aside>
      </div>
    </div>
  );
}