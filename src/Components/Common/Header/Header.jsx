import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../../Login/Auth/auth";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  
  const [name, setName] = useState(null);

  useEffect(() => {
    // Get the username from sessionStorage when the component mounts
    const storedUserName = getSessionStorage("user");
    if (storedUserName) {
      setName(changeToCapitalize(storedUserName[0].firstName));
    } else {
      setName("User"); // Default if userName is not found in sessionStorage
    }
  }, []);

  const OpenPage = (type) => {
    if (type === "HO") {
      // Handle Home page navigation
    } else if (type === "AB") {
      // Handle About page navigation
    } else if (type === "CO") {
      // Handle Contact page navigation
    }
  };

  const iconBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "0 5px",
    backgroundColor: "#fff",
    position: "relative",
    cursor: "pointer",
  };

  const badgeStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "#075307",
    color: "#fff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
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
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block" onClick={() => OpenPage("HO")}>
          {/* <a href="#" className="nav-link">Home</a> */}
        </li>
        <li className="nav-item d-none d-sm-inline-block" onClick={() => OpenPage("AB")}>
          {/* <a href="#" className="nav-link">About Us</a> */}
        </li>
        <li className="nav-item d-none d-sm-inline-block" onClick={() => OpenPage("CO")}>
          {/* <a href="#" className="nav-link">Contact Us</a> */}
        </li>
      </ul>

      {/* Right section */}
      <ul
        className="navbar-nav ml-auto"
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "5px",
          padding: "0px 20px 0px 20px",
        }}
      >
        <li className="nav-item">
          <span className="nav-link" style={{ color: "#333", fontWeight: "bold" }}>
            Hi, {name ? name : "User"}
          </span>
        </li>

        <li style={iconBoxStyle}>
          <i className="fas fa-bell"></i>
          <span style={badgeStyle}>2</span>
        </li>
        <li style={iconBoxStyle}>
          <i className="fas fa-envelope"></i>
          <span style={badgeStyle}>5</span>
        </li>
        <li style={iconBoxStyle}>
          <i className="fas fa-user"></i>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
