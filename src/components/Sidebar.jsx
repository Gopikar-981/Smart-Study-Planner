import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaTasks, FaClock, FaPlus } from "react-icons/fa";
import "./Sidebar.css";
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo1">MyStudyLife</h2>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaCalendarAlt /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/activities" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaTasks /> Activities
          </NavLink>
        </li>
        <li>
          <NavLink to="/timer" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaClock /> Focus Timer
          </NavLink>
        </li>
      </ul>

      <button className="premium-btn">⚡ Try premium free</button>
      <button className="add-btn">
        <FaPlus /> Add New
      </button>

     
    </aside>
  );
}

export default Sidebar;
