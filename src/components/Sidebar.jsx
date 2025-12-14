import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaTasks, FaClock, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  // Close sidebar when pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Hamburger button - visible only on mobile */}
      <button 
        className="hamburger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? "active" : ""}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo1">📚 MyStudyLife</h2>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleLinkClick}
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleLinkClick}
            >
              <FaCalendarAlt /> Calendar
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/activities" 
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleLinkClick}
            >
              <FaTasks /> Activities
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/timer" 
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleLinkClick}
            >
              <FaClock /> Focus Timer
            </NavLink>
          </li>
        </ul>

        <button className="premium-btn">⚡ Try premium free</button>
        <button className="add-btn">
          <FaPlus /> Add New
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
