import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../../Login/Auth/auth";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();


  const [role, setRole] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const [name, setName] = useState(null);
  const [roleName, setRoleName] = useState(null);

  useEffect(() => {
    const storedUserName = getSessionStorage("user");
    if (storedUserName) {
      setName(changeToCapitalize(storedUserName[0].firstName));
      setRoleName(changeToCapitalize(storedUserName[0].assignedProfile.profileName))
    } else {
      setName("User");
      setRoleName('') // Default if userName is not found in sessionStorage
    }
  }, []);

  const iconBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "0 5px",
    backgroundColor: "#fff",
    position: "relative",
    cursor: "pointer",
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "40px",
    left: "-25px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "150px",
    zIndex: 10,
    display: dropdownVisible ? "flex" : "none", // Controlled by state
    flexDirection: "column",
  };

  const dropdownItemStyle = {
    padding: "10px",
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",
    textAlign: "left",
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left section */}
      <ul className="navbar-nav">
        <li className="nav-item text-white font-weight-normal">
          <a
            onClick={toggleSidebar}
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
          >
            <i className="fas fa-bars" style={{ color: "#004d00" }}></i>
          </a>
        </li>
      </ul>

      {/* Right section */}
      <ul
        className="navbar-nav ml-auto"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 20px 0px 20px",
        }}
      >
             <li className="nav-item">
        {/* <span className="nav-link" style={{ color: "#333", fontWeight: "500", fontSize: "xx-small" }}>
            Hi, <h6>Rahul</h6><br/>{name ? name : "User"}
          </span> */}
         <span
      className="nav-link"
      style={{
        color: "#333",
        fontWeight: "500",
        fontSize: "x-small",
        textAlign: "right",
        display: "inline-block",
      }}
    >
      {greeting}, {name || "Rahul Gupta"} <br />
      <span style={{ fontSize: "x-small", color: "#555"}}>
        {roleName || "Guest"}
      </span>
    </span>
        </li>
        <li
          className="nav-item"
          style={{
            ...iconBoxStyle,
            position: "relative",
          }}
          onClick={handleToggleDropdown}
        >
          <i className="fas fa-user"></i>
          <div className="dropdown-menu" style={dropdownMenuStyle}>
            <div
              style={dropdownItemStyle}
              onClick={handleNavigateToProfile}
            >
              Profile
            </div>
            <div
              style={dropdownItemStyle}
              onClick={handleResetPassword}
            >
              Reset Password
            </div>
          </div>
        </li>

        <li style={iconBoxStyle}>
          <i className="fas fa-bell" style={{ color: "#D57616", fontSize: "20px" }}></i>
        </li>
        <li style={iconBoxStyle}>
          <i className="fas fa-envelope" style={{ color: "#006400", fontSize: "20px" }}></i>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
