import React from 'react';
import { NavLink } from 'react-router-dom'; 

const SideBar1 = () => {
  // Simulate fetching data from session storage
  const data = JSON.parse(sessionStorage.getItem('userInfo')) || {};

  // Extract menu permissions from the assigned profile
  const menuPermission = data?.assignedProfile?.menuPermission || [];

  return (
    <div className="sidebar">
      <ul className="menu-list">
        {menuPermission.map((menu) => (
          <li key={menu._id} className="menu-item">
            <NavLink to={menu.url} className="menu-link">
              <i className={`menu-icon ${menu.icon}`}></i>
              <span>{menu.name}</span>
            </NavLink>
            {/* Render submenus if they exist */}
            {menu.submenus?.length > 0 && (
              <ul className="submenu-list">
                {menu.submenus.map((submenu) => (
                  <li key={submenu._id} className="submenu-item">
                    <NavLink to={submenu.url} className="submenu-link">
                      <i className={`submenu-icon ${submenu.icon}`}></i>
                      <span>{submenu.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar1;
