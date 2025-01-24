import React, { useEffect, useState } from "react";
import "./CommonHeader.scss";
import { getSessionStorage } from "../../Login/Auth/auth";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";

const CommonHeader = ({
  title,
  subtitle,
  buttons = [],
}) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const storedUsername = getSessionStorage('user');
    console.log(storedUsername,"storedUsername")
    if (storedUsername) {
      setName(`${changeToCapitalize(storedUsername[0].firstName)} ${changeToCapitalize(storedUsername[0].lastName)}`);
    }
  }, []); 

  return (
    <div className="common-header">
      <div className="header-left">
        {/* <p className="welcome-text">
          Welcome - <span className="role">{name}</span>
        </p> */}
        <h2 className="title">{title}</h2>
      </div>
      <div className="header-right">
        <p className="subtitle">{subtitle}</p>
        <div className="buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`btn ${button.type || "default"}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
