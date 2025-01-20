// Header.jsx
import React from "react";
import "./Header.css"; // Optional, for custom styling

const Header = () => {
  return (
    <div className="header">
      <div className="logo">Admin Panel</div>
      <div className="profile">
        <span>Welcome, Admin</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Header;
