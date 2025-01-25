import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../../Login/Auth/auth";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();

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
    // Get the username from sessionStorage when the component mounts
    const storedUserName = getSessionStorage("user");
    if (storedUserName) {
      setName(changeToCapitalize(storedUserName[0].firstName));
      setRoleName(changeToCapitalize(storedUserName[0].assignedProfile.profileName))
    } else {
      setName("User");
      setRoleName('') // Default if userName is not found in sessionStorage
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

  const bellIconStyle = {
    color: "#D57616", 
    fontSize: "20px",
  };
  
  const envelopeIconStyle = {
    color: "#006400", 
    fontSize: "20px",
  };
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
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
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
        <li style={iconBoxStyle}>
          <i className="fas fa-user"></i>
        </li>

        <li style={iconBoxStyle}>
        <i className="fas fa-bell" style={bellIconStyle}></i>
          {/* <span style={badgeStyle}>2</span> */}
        </li>
        <li style={iconBoxStyle}>
        <i className="fas fa-envelope" style={envelopeIconStyle}></i>
          {/* <span style={badgeStyle}>5</span> */}
        </li>
      
      </ul>
    </nav>
  );
}

export default Header;
