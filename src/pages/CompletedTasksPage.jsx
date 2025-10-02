import { useEffect, useState } from "react";
import "./PendingTasksPage.css";

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved.filter(t => t.done));
  }, []);

  return (
    <div className="task-container">
      <h2 className="page-title">✅ Completed Tasks</h2>

      {tasks.length === 0 ? (
        <p className="empty-msg">No tasks completed yet</p>
      ) : (
        <ul className="task-list">
          {tasks.map((t, i) => (
            <li key={i} className="task-card">
              <div className="task-header">
                <h3>{t.title}</h3>
                <span className="task-date">📅 Completed on {t.date}</span>
              </div>
              {t.desc && <p className="task-desc">{t.desc}</p>}
              {t.time && <p className="task-time">⏰ {t.time}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
