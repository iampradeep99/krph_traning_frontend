import React, { useState } from "react";
import "./Login.css";
import Logo from "../../Assets/logo.png";
import LoginBg from "../../Assets/login-bg.png";
import { authenticate } from "./Services/Methods"

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authenticate(userId, password);
      console.log("Login Successful:", result);
    } catch (err) {
      console.error(err);
      setError(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <div className="container">
      <img src={LoginBg} alt="Background" className="background" />
      <div className="box">
        <div className="left-section">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
      </div>
      <div className="box-2">
        <div className="right-section">
          <h2 style={{ textAlign: "center", fontSize: "30px", margin: "10px" }}>
            Welcome Back!
          </h2>
          <p style={{ color: "#747474", textAlign: "center", marginTop: "0px" }}>
            Please login to continue.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="Enter User ID"
                className="input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          <a href="/admin" className="forgot-password">
            Forgot Password? Click Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
