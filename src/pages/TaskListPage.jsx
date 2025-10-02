import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskListPage() {
  const { filter } = useParams();        // "pending" | "overdue" | "completed"
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    const today = new Date().toISOString().slice(0, 10);

    let filtered = saved;
    if (filter === "pending") {
      filtered = saved.filter(t => !t.done);
    } else if (filter === "overdue") {
      filtered = saved.filter(t => !t.done && t.date < today);
    } else if (filter === "completed") {
      filtered = saved.filter(t => t.done);
    }

    setTasks(filtered);
  }, [filter]);

  return (
    <div className="task-list-page">
      <h2>{filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks</h2>
      {tasks.length === 0 ? (
        <p>No {filter} tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(t => (
            <li key={t.id} className="task-card">
              <h3>{t.title}</h3>
              <p>📚 {t.subject || "No subject"}</p>
              <p>📅 {t.date} {t.time && `at ${t.time}`}</p>
              {t.notes && <p>📝 {t.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
