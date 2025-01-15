// Layout.jsx
import React from "react";
import "../Layout/partials/Layout.css";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";

const Layout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          {children} {/* This is where the route content will be injected */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
