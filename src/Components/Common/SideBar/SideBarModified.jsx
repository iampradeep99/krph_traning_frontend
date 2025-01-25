import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getSessionStorage } from "../../Login/Auth/auth";
import newlogo from "../SideBar/Assets/logo-product.svg";
import { useNavigate } from "react-router-dom";

const SideBarModified = ({ isSidebarOpen }) => {
  // Get session storage data with a fallback
  let dataMenu = getSessionStorage("user") || [];
  const navigate = useNavigate();
  const menuPermission = dataMenu[0]?.assignedProfile?.menuPermission || [];

  // Sort the menu items based on the 'order' property
  const sortedMenu = menuPermission.sort((a, b) => a.order - b.order);

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
       <style>

  </style>
      <img
        src={newlogo}
        alt="Awards"
        className="brand-image"
        style={{
          width: isSidebarOpen ? "95px" : "35px",
          height: isSidebarOpen ? "60px" : "40px",
          transition: "all 0.3s ease",
          marginTop: isSidebarOpen ? "20px" : "10px",
          marginLeft: isSidebarOpen ? "50px" : "12px",
          marginRight: isSidebarOpen ? "20px" : "10px",
          marginBottom: isSidebarOpen ? "20px" : "10px",
        }}
      />
      <div className="sidebar" id="sidebarcolor" style={{ flex: "1" }}>
        <nav className="mt-2 text-white">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            style={{ color: "white", fontSize: "14px" }}
          >
            {sortedMenu.map((menu) => (
              <li
                key={menu._id}
                className={`nav-item has-treeview text-white ${
                  expandedMenu === menu._id ? "menu-open" : ""
                }`}
                style={{ marginBottom: "2px", color: "white" }}
              >
                {/* Main menu item */}
                {menu.submenus?.length > 0 ? (
                  <div
                    className={`nav-link ${expandedMenu === menu._id ? "active" : ""}`}
                    onClick={() => toggleMenu(menu._id)}
                    style={{ cursor: "pointer", color: "white", padding: "6px 12px" }}
                  >
                    <i className={`nav-icon fas ${menu.icon}`}></i>
                    <p>
                      {menu.name}
                      <i
                        className={`right fas fa-angle-${expandedMenu === menu._id ? "down" : "down"}`}
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
                      backgroundColor: activemenu === menu._id ? "#E3F7B6" : "#075307",
                      borderRadius: activemenu === menu._id ? "24px" : "24px", // Change border radius here
                      padding: "6px 12px",
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
                      color: "white",
                      // borderRadius: "24px",
                    }}
                  >
                    {menu.submenus.map((submenu) => (
                      <li
                        key={submenu._id}
                        onClick={() => handleSubmenuClick(submenu._id)}
                        className="nav-item"
                        style={{
                          color: "white",
                          backgroundColor:
                            activeSubmenu === submenu._id ? "#037003" : "white",
                          borderRadius: "24px",
                        }}
                      >
                        <NavLink
                          to={submenu.url}
                          className="nav-link"
                          style={{
                            color: "white",
                            backgroundColor:
                              activeSubmenu === submenu._id ? "#E3F7B6" : "white",
                            borderRadius: "24px",
                            padding: "6px 12px",
                          }}
                        >
                          <i
                            className={`nav-icon fas ${submenu.icon}`}
                            style={{
                              color: "#075307",
                              backgroundColor:
                                activeSubmenu === submenu._id ? "#E3F7B6" : "",
                            }}
                          ></i>
                          <p
                            style={{
                              color: "#075307",
                              fontSize: "13px",
                            }}
                          >
                            {submenu.name}
                          </p>
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
          padding: "8px",
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
            padding: "6px 12px",
          }}
        >
          <i
            className="nav-icon fas fa-sign-out-alt"
            style={{ marginRight: "6px" }}
          ></i>
          {isSidebarOpen && <span style={{ fontSize: "13px" }}>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBarModified;
