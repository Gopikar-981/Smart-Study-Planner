import React, { useEffect, useState } from "react";
import { scheduleReminderForTask } from "../utils/reminders";
import { uid } from "../utils/uid";

// A simple TimelineItem component
function TimelineItem({ task }) {
  return (
    <div className="timeline-item">
      <div className="t-time">{task.date} {task.time || ""}</div>
      <div className="t-title">{task.title}</div>
      {task.subject && <div className="t-sub">{task.subject}</div>}
    </div>
  );
}

export default function TimelinePage() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
    saved.forEach(scheduleReminderForTask); // reschedule reminders
  }, []);

  return (
    <div className="app">
      <h1>Timeline View</h1>
      <div className="timeline-card">
        <div className="timeline-scroll">
          {tasks.length === 0 ? (
            <p>No tasks yet. Add tasks from the dashboard.</p>
          ) : (
            tasks.map((task) => <TimelineItem key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
}
