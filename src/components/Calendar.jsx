import React, { useMemo, useState } from "react";
import "./Calendar.css"; 

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export default function Calendar({ tasks = [], onEdit }) {
  const [cursor, setCursor] = useState(new Date());

  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);

  
  const weeks = useMemo(() => {
    const startWeekDay = monthStart.getDay();
    const days = [];

    for (let i = 0; i < startWeekDay; i++) days.push(null);
    for (let d = 1; d <= monthEnd.getDate(); d++) {
      days.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    while (days.length % 7 !== 0) days.push(null);

    const w = [];
    for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7));
    return w;
  }, [cursor]);

  function prevMonth() {
    setCursor(c => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCursor(c => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }

  function tasksForDay(day) {
    if (!day) return [];
    const key = day.toISOString().slice(0, 10);
    return tasks
      .filter(t => t.date === key)
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  }

  return (
    <div className="calendar-card">
      {/* Header */}
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h4>
          {cursor.toLocaleString(undefined, { month: "long" })}{" "}
          {cursor.getFullYear()}
        </h4>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      {/* Weekdays */}
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      {weeks.map((week, wi) => (
        <div className="week" key={wi}>
          {week.map((day, di) => {
            const today =
              day && day.toDateString() === new Date().toDateString();
            return (
              <div key={di} className={`day-cell ${today ? "today" : ""}`}>
                {day && <span className="day-num">{day.getDate()}</span>}
                {day && tasksForDay(day).length > 0 && (
                  <span className="dot"></span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
