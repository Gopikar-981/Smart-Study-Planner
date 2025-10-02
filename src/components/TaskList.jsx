import React from "react";
import { scheduleReminderForTask } from "../utils/reminders";

function TaskRow({ task, onDelete, onEdit, onToggle, compact }) {
  const dateTime = task.date + (task.time ? " " + task.time : "");
  return (
    <div className={"task" + (task.done ? " done" : "")}>
      <div className="task-main">
        <div className="task-title">
          <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
          <div className="meta">
            <strong>{task.title}</strong>
            <div className="muted">{dateTime} {task.duration ? `· ${task.duration}` : ""} {task.subject ? `· ${task.subject}` : ""}</div>
            {task.notes && <div className="task-notes">{task.notes}</div>}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button className="btn small" onClick={() => { onEdit(task); }}>Edit</button>
        <button className="btn small ghost" onClick={() => scheduleReminderForTask(task)}>Schedule Reminder</button>
        <button className="btn small danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default function TaskList({ tasks = [], onDelete, onEdit, onToggle, compact }) {
  if (!tasks.length) return <div className="card">No tasks yet. Add your first task.</div>;
  return (
    <div className="card">
      {!compact && <h2>Your Tasks</h2>}
      <div className="task-list">
        {tasks.map(t => <TaskRow key={t.id} task={t} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />)}
      </div>
    </div>
  );
}
