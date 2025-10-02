import React from "react";
import "./DayCalendar.css";

export default function DayCalendar({ tasks = [] }) {
  // Generate 24 hours in AM/PM format
  const hours = Array.from({ length: 24 }, (_, i) => {
    const suffix = i < 12 ? "AM" : "PM";
    const hour12 = i % 12 === 0 ? 12 : i % 12;
    return `${hour12.toString().padStart(2, "0")}:00 ${suffix}`;
  });

  // Get today's date in readable format
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Match tasks by hour
  function tasksForHour(hourLabel) {
    // Convert "09:00 AM" → "09:00"
    const hour = hourLabel.slice(0, 5);
    return tasks.filter(t => t.time && t.time.startsWith(hour));
  }

  return (
    <div className="day-calendar">
      {/* ✅ Date header */}
      <div className="day-header">
        <h4>{today}</h4>
      </div>

      {hours.map((h, idx) => (
        <div key={idx} className="hour-row">
          <div className="hour-label">{h}</div>
          <div className="hour-slot">
            {tasksForHour(h).map((t, i) => (
              <div key={i} className="task-box">
                <strong>{t.title}</strong>
                {t.desc && <p>{t.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
