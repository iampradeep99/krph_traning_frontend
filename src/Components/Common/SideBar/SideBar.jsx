import React, { useEffect } from "react";
import newlogo from "../SideBar/Assets/logo-product.svg";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../../../Framework/Components/Widgets/Notification/NotificationProvider";
import { getSessionStorage } from "../../Login/Auth/auth";



function SideBar({ isSidebarOpen }) {
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();

   let data = getSessionStorage('useriInfo');
   console.log("getting session storage", JSON.stringify(data));


  const signOut = async () => {
    debugger;
    try {
      sessionStorage.clear();
      navigate("/login");
      setAlertMessage({
        type: "success",
        message: "You have been  succesfully logout",
      });
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
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
  className="brand-image"
  style={{
    width: isSidebarOpen ? "140px" : "40px", 
    height: isSidebarOpen ? "80px" : "40px", 
    transition: "all 0.3s ease", 
    marginTop: isSidebarOpen ? "20px" : "10px", 
    marginLeft: isSidebarOpen ? "50px" : "18px", 
    marginRight: isSidebarOpen ? "20px" : "10px", 
    marginBottom: isSidebarOpen ? "20px" : "10px"
  }}
  
/>


     

<div className="sidebar" id="sidebarcolor" style={{ flex: "1" }}>
  <nav className="mt-2 text-white">
    <ul
      className="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li className="nav-item has-treeview" style={{ marginBottom: "10px" }}>
        <a onClick={() => navigate("/TrainingDashboard")}className="nav-link active">
          <i className="nav-icon fas fa-tachometer-alt"></i>
          <p>
            Dashboard
            <i className="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a className="nav-link">
              <i className="nav-icon fas fa-door-closed"></i>
              <p>Training Dashboard</p>
            </a>
          </li>
        </ul>
      </li>

      <li className="nav-item has-treeview" style={{ marginBottom: "10px" }}>
        <a onClick={() => navigate("/CreateNewTraining")} className="nav-link active">
          <i className="nav-icon fas fa-calendar-alt"></i> {/* Updated icon for Training Calendar */}
          <p>
            Training Calendar
            <i className="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a className="nav-link">
              <i className="nav-icon fas fa-calendar-check"></i> {/* Icon for Upcoming Training */}
              <p>Up-Coming Training</p>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <i className="nav-icon fas fa-calendar-times"></i> {/* Icon for Completed Training */}
              <p>Completed Training</p>
            </a>
          </li>
        </ul>
      </li>

      <li className="nav-item" onClick={() => navigate("/CreateNewAgent")} style={{ marginBottom: "10px" }}>
        <a className="nav-link" id="anchAirConditioner">
          <i className="nav-icon fas fa-user-plus"></i> {/* Icon for creating a new agent */}
          <p>Create New Agent</p>
        </a>
      </li>

      <li className="nav-item" style={{ marginBottom: "10px" }} >
        <a onClick={() => navigate("/ModifyAgent")} className="nav-link" id="anchWashingMachine">
          <i className="nav-icon fas fa-user-edit"></i> {/* Icon for modifying agent */}
          <p>Modify Agent</p>
        </a>
      </li>

      <li className="nav-item" style={{ marginBottom: "10px" }} >
        <a  onClick={() => navigate("/CompleteTrainingReport")} className="nav-link" id="anchCooler">
          <i className="nav-icon fas fa-clipboard-list"></i> {/* Icon for reports */}
          <p>Report</p>
        </a>
      </li>

      <li className="nav-item" style={{ marginBottom: "10px" }}>
        <a    className="nav-link" id="anchHeater">
          <i className="nav-icon fas fa-user-circle"></i> {/* Icon for profile */}
          <p>Profile</p>
        </a>
      </li>
      <li className="nav-item" style={{ marginBottom: "10px" }}>
        <a  onClick={() => navigate("/UserSetting")}   className="nav-link" id="anchHeater">
          <i className="nav-icon fas fa-cog"></i> {/* Icon for profile */}
          <p>Setting</p>
        </a>
      </li>

      <div style={{ borderTop: "", padding: "0px" }}>
        <ul className="nav nav-pills nav-sidebar flex-column">
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <a
              href="#"
              className="nav-link"
              style={{ color: "white" }}
              onClick={() => signOut()}
            >
              <i className="nav-icon fas fa-sign-out-alt" style={{ color: "white" }}></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
    </ul>
  </nav>
</div>


  
    </aside>
  );
}

export default SideBar;
