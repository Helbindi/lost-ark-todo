import React from "react";

function Navigation({ active, handleToggle }) {
  return (
    <nav className="primary-nav">
      <h2 className="nav-header">Lost Ark Homework</h2>
      <ul className="nav-list">
        <li
          className={`nav-item ${active ? "active" : ""}`}
          onClick={handleToggle}
        >
          Characters
        </li>
        <li
          className={`nav-item ${!active ? "active" : ""}`}
          onClick={handleToggle}
        >
          Roster
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
