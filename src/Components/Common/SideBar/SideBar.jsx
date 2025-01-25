import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getSessionStorage, setSessionStorage } from "../../Login/Auth/auth";
import newlogo from "../SideBar/Assets/logo-product.svg";
import { useNavigate } from "react-router-dom";
import "./SideBar.scss";

const SideBarModified = ({ isSidebarOpen }) => {
  // Get session storage data with a fallback
  let dataMenu = getSessionStorage("user") || [];

  const navigate = useNavigate();
  const menuPermission = dataMenu[0]?.assignedProfile?.menuPermission || [];

  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activemenu, setActivemenu] = useState(null);
  const toggleMenu = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };
  const handleSubmenuClick = (submenuId) => {
    setActiveSubmenu(submenuId);
  };
  const handlemenuClick = (menuId) => {
    setActivemenu(menuId);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{
        backgroundColor: "#075307",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
  <img
  src={newlogo}
  alt="Awards"
  className={`brand-image ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
/>
      <div className="sidebar" id="sidebarcolor" style={{ flex: "1" }}>
        <nav className="mt-2 text-white">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            style={{ color: "white", fontSize: "6px" }}
          >
            {menuPermission.map((menu) => (
              <li
                key={menu._id}
                className={` nav-item has-treeview text-white ${expandedMenu === menu._id ? "menu-open" : ""
                  }`}
                style={{ marginBottom: "1px", color: "white" }}
              >
                {/* Main menu item */}
                {menu.submenus?.length > 0 ? (
                  <div
                    className={`nav-link ${expandedMenu === menu._id ? "active" : ""}`}
                    onClick={() => toggleMenu(menu._id)}
                    style={{ cursor: "pointer", color: "white", padding: "1px 4px" }}
                  >
                    <i className={`nav-icon fas ${menu.icon}`}></i>
                    <p>
                      {menu.name}
                      <i
                        className={`right fas fa-angle-${expandedMenu === menu._id ? "down" : "down"
                          }`}
                      ></i>
                    </p>
                  </div>
                ) : (
                  <NavLink
                    to={menu.url}
                    className="nav-link"
                    onClick={() => handlemenuClick(menu._id)}
                    style={{
                      color: activemenu === menu._id ? "#075307" : "white",
                      backgroundColor:
                        activemenu === menu._id ? "#E3F7B6" : "#075307",
                      borderRadius: "8px",
                      padding: "1px 4px",
                    }}
                  >
                    <i className={`nav-icon fas ${menu.icon}`}></i>
                    <p>{menu.name}</p>
                  </NavLink>
                )}

                {/* Submenu items */}
                {menu.submenus?.length > 0 && (
                  <ul
                    className="nav nav-treeview"
                    style={{
                      display: expandedMenu === menu._id ? "block" : "none",
                    }}
                  >
                    {menu.submenus.map((submenu) => (
                      <li
                        key={submenu._id}
                        onClick={() => handleSubmenuClick(submenu._id)}
                        className={`nav-item ${activeSubmenu === submenu._id ? "active-submenu" : ""
                          }`}
                      >
                        <NavLink
                          to={submenu.url}
                          className="nav-link"
                        >
                          <i className={`nav-icon fas ${submenu.icon}`}></i>
                          <p>{submenu.name}</p>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        style={{
          padding: "1px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#064d06",
          color: "white",
        }}
        className="nav nav-treeview"
      >
        <button
          className="nav-link nav-item"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: "1px 4px",
          }}
        >
          <i
            className="nav-icon fas fa-sign-out-alt"
            style={{ marginRight: "1px" }}
          ></i>
          {isSidebarOpen && <span style={{ fontSize: "5px" }}>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBarModified;
