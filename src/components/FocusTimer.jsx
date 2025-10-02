import React, { useState, useEffect, useRef } from "react";
import "./FocusTimer.css";

const FocusTimer = ({ initialMinutes = 25 }) => {
  const [time, setTime] = useState(initialMinutes * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Format seconds -> MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Start/Stop interval when active
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const toggleTimer = () => setIsActive((prev) => !prev);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setTime(initialMinutes * 60);
  };

  return (
    <div className="focus-timer-container">
      <h2>Focus Timer</h2>
      <div className="focus-timer-circle">
        <span className="focus-time-text">{formatTime(time)}</span>
      </div>
      <div className="focus-buttons">
        <button onClick={toggleTimer} className="btn start-btn">
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer} className="btn reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
