// Sidebar.jsx
import React from "react";
import "./Sidebar.css"; // Optional, for custom styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
        <li>
          <a href="/reports">Reports</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
