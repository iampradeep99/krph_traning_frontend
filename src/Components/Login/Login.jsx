import React from "react";
import "./Login.css";
import Logo from "../../Assets/logo.png";
import LoginBg from "../../Assets/login-bg.png";
import GreenButton from "../../Assets/GreenTextLoginPage";

const Login = () => {
  return (
    <div className="container">
      <img src={LoginBg} alt="Background" className="background" />
        <div className="box">
          <div className="left-section">
            <img src={Logo} alt="Logo" className="logo" />
         <GreenButton/>
            {/* <button className="action-button">
              Fasal Bima Karao
              <br />
              Suraksha Kawach Pao
            </button> */}
          </div>
        </div>
      <div className="box-2">
        <div className="right-section">
          <h2 style={{textAlign:"center", fontSize:"30px", margin:"10px"}}>Welcome Back!</h2>
          <p style={{color:"#747474",textAlign:"center", marginTop:'0px'}}>Please login to continue.</p>
          <form>
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="Enter User ID"
                className="input"
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
              />
            </div>
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
