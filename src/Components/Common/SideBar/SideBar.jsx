import React from "react";
import newlogo from "../SideBar/Assets/logo-product.svg";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function SideBar() {
      const navigate = useNavigate();
    
  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ backgroundColor: "#075307", display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* Logo */}
      <a href="#" className="brand-link" style={{ height: "55px" }}>
        <img
          src={newlogo}
          alt="Awards"
          className="brand-image"
          style={{ width: "40px", height: "58px" }}
        />
      </a>

      {/* Sidebar Menu */}
      <div className="sidebar" id="sidebarcolor" style={{ flex: "1" }}>
        <nav className="mt-2 text-white">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
                  <li class="nav-item">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview" style={{display: "none"}}>
              <li class="nav-item">
                <a href="./index.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard v1</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="./index2.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard v2</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="./index3.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard v3</p>
                </a>
              </li>
            </ul>
          </li>
            <li
              className="nav-item"
              onClick={() => CategoryBrandClick("anchRefrigirator")}
            >
              <a href="#" className="nav-link" id="anchRefrigirator">
                <i className="nav-icon fas fa-door-closed"></i>
                <p>Training Calender</p>
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => CategoryBrandClick("anchAirConditioner")}
            >
              <a href="#" className="nav-link" id="anchAirConditioner">
                <i className="nav-icon fas fa-snowflake"></i>
                <p>Create New Agent</p>
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => CategoryBrandClick("anchWashingMachine")}
            >
              <a href="#" className="nav-link" id="anchWashingMachine">
                <i className="nav-icon fas fa-archive"></i>
                <p>Modify Agent</p>
              </a>
            </li>
            <li className="nav-item" onClick={() => CategoryBrandClick("anchCooler")}>
              <a href="#" className="nav-link" id="anchCooler">
                <i className="nav-icon fas fa-fan"></i>
                <p>Report</p>
              </a>
            </li>
            <li className="nav-item" onClick={() => CategoryBrandClick("anchHeater")}>
              <a href="#" className="nav-link" id="anchHeater">
                <i className="nav-icon fas fa-temperature-high"></i>
                <p>Profile</p>
              </a>
            </li>
            <div style={{ borderTop: "", padding: "0px" }}>
        <ul className="nav nav-pills nav-sidebar flex-column">
          <li className="nav-item" >
            <a href="#" className="nav-link" style={{ color: "white" }} onClick={() => navigate("/")}>
              <i className="nav-icon fas fa-sign-out-alt" style={{ color: "white" }}></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
     
    </aside>
  );
}

export default SideBar;
