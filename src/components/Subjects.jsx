import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  // Load subjects from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("subjects") || "[]");
    setSubjects(saved);
  }, []);

  // Save subjects whenever they change
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (newSubject.trim() === "") return;
    setSubjects([...subjects, newSubject]);
    setNewSubject("");
  };

  const deleteSubject = (subj) => {
    setSubjects(subjects.filter((s) => s !== subj));
  };

  const goToTaskPage = (subject) => {
    navigate(`/add-task/${subject}`);
  };

  return (
    <div className="subjects-card">
      <h2>📘 Subjects</h2>
      <ul className="subject-list">
        {subjects.length === 0 && <p>No subjects yet. Add one below!</p>}
        {subjects.map((s, i) => (
          <li key={i} className="subject-item">
            {s}
            <div>
              <button onClick={() => goToTaskPage(s)} className="task-btn">
                ➕ Add Task
              </button>
              <button onClick={() => deleteSubject(s)} className="delete-btn">
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="subject-input">
        <input
          type="text"
          placeholder="Enter new subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addSubject}>+ Add</button>
      </div>
    </div>
  );
}
