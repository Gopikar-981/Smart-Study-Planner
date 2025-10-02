// src/pages/TaskFormPage.jsx
import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";

export default function TaskFormPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | done

  // Load tasks from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save or update a task
  function handleSave(newTask) {
    setTasks(prev => {
      const idx = prev.findIndex(t => t.id === newTask.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newTask;
        return copy;
      }
      return [...prev, newTask];
    });
  }

  // Toggle done
  function toggleDone(id) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  // Filter tasks
  const filtered = tasks.filter(t => {
    if (filter === "pending") return !t.done;
    if (filter === "done") return t.done;
    return true; // all
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tasks</h1>
      <AddTask onSave={handleSave} />

      <div style={{ margin: "1rem 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("done")}>Completed</button>
      </div>

      <h2>
        {filter === "all"
          ? "All Tasks"
          : filter === "pending"
          ? "Pending Tasks"
          : "Completed Tasks"}
      </h2>

      <ul>
        {filtered.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
            />
            <strong>{t.title}</strong> – {t.date}
            {t.time && ` @ ${t.time}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
