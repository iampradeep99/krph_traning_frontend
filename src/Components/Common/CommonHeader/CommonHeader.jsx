import React from "react";
import "./CommonHeader.scss";

const CommonHeader = ({
  title,
  subtitle,
  buttons = [], 
}) => {
  return (
    <div className="common-header">
      <div className="header-left">
        <p className="welcome-text">
          Welcome - <span className="role">Admin</span>
        </p>
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
