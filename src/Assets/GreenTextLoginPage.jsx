import React from "react";

function GreenButton() {
  const buttonStyle = {
    background:" linear-gradient(to bottom, red,rgb(53, 181, 60))",
    color: "white", // White text
    padding: "15px 30px", // Padding for the button
    textAlign: "center", // Center-align text
    fontSize: "16px", // Font size
    fontWeight:"600",
    borderRadius: "8px", // Rounded corners
    border: "none", // Remove border
    fontFamily: "Arial, sans-serif", // Font family
    cursor: "pointer", // Pointer cursor on hover
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
  };

  const containerStyle = {
    // backgroundImage: "url('background-image-url')", // Add the green background
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle}>
        Fasal Bima Karao
        <br />
        Suraksha Kawach Pao
      </button>
    </div>
  );
}

export default GreenButton;
