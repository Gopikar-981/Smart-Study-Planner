import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import DayCalendar from "./DayCalendar";

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [focusTime, setFocusTime] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false); 
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const timerRef = useRef(null);

  // Clock update
  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  // Load tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [
      { title: "Rghj", desc: "Assignment", date: "2025-09-30", time: "17:00", done: false },
    ];
    setTasks(saved);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isRunning && focusTime > 0) {
      timerRef.current = setInterval(() => {
        setFocusTime(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    if (focusTime === 0) setFocusTime(25 * 60); // reset after completion
    setIsRunning(prev => !prev);
  };

  const pendingTasks = tasks.filter(t => !t.done);
  const overdueTasks = tasks.filter(t => !t.done && new Date(t.date) < new Date());
  const completedTasks = tasks.filter(t => t.done);

  const formatTime = d => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = d => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const formatFocusTime = () => `${Math.floor(focusTime / 60)}:${(focusTime % 60).toString().padStart(2, "0")}`;

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <header className="header">
          <h3>{formatTime(time)}</h3>
          <p>{formatDate(time)}</p>
        </header>

        <section className="overview">
          <div className="focus-card">
            <h2>{pendingTasks.length} tasks due today.</h2>
            <h1 className="good">Good Afternoon.</h1>
            <div className="focus-timer">
              <p>Focus</p>
              <h1>{formatFocusTime()}</h1>
              <button className="play-btn" onClick={toggleTimer}>
                {isRunning ? "⏸" : "▶"}
              </button>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stat-box" onClick={() => navigate("/tasks/pending")}>
            👀 Pending Tasks <h3>{pendingTasks.length}</h3>
          </div>
          <div className="stat-box" onClick={() => navigate("/tasks/overdue")}>
            ⚠ Overdue Tasks <h3>{overdueTasks.length}</h3>
          </div>
          <div className="stat-box" onClick={() => navigate("/tasks/completed")}>
            👍 Tasks Completed <h3>{completedTasks.length}</h3>
          </div>
          <div className="stat-box">
            🔥 Your Streak <h3>0</h3>
          </div>
        </section>
      </main>

      <aside className="calendar">
        <h3>Calendar</h3>
        <DayCalendar tasks={tasks} />
      </aside>
    </div>
  );
};

export default Dashboard;
