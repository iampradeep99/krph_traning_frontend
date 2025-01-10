// Import React
import React from "react";

const LoginComponent = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-heading">Welcome Back!</h1>
        <p className="login-subtext">Please login to continue.</p>
        <form>
          <label htmlFor="userId" className="login-label">User ID</label>
          <input type="text" id="userId" placeholder="admin" defaultValue="admin" className="login-input" />

          <label htmlFor="password" className="login-label">Password</label>
          <input type="password" id="password" placeholder="Password" defaultValue="************" className="login-input" />

          <button type="submit" className="login-button">SIGN IN</button>
        </form>
        <p className="forgot-password">
          Forgot Password? <a href="/" className="login-link">Click Here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
