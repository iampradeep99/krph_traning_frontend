import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../../Framework/Components/Widgets/Notification/NotificationProvider";
import "./Login.scss";
import logo from "./Assets/logo.png";
import { authenticate, getUserByID } from "./Services/Methods";
import { decodeJWTToken, setSessionStorage } from "../Login/Auth/auth";

const Login = () => {
  const setAlertMessage = AlertMessage();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authenticate(userId, password);
      if (result.responseCode === 1) {
        setAlertMessage({
          type: "success",
          message: "Login Successfully",
        });

        const decodetoken = decodeJWTToken(result.responseData);
        const sessionToken = result.responseData[0].token;
        setSessionStorage("token", sessionToken);
        fetchUserDetails(decodetoken, sessionToken);
      } else {
        setAlertMessage({
          type: "error",
          message: result.responseMessage,
        });
      }
    } catch (err) {
      setAlertMessage({
        type: "error",
        message: "An error occurred during login",
      });
    }
  };

  const fetchUserDetails = async (decodetoken, token) => {
    try {
      const result = await getUserByID(decodetoken, token);
      if (result.responseCode === 1) {
        const user = { ...result.responseData };
        setSessionStorage("user", user);
        navigate("/home");
      } else {
        setAlertMessage({
          type: "error",
          message: result.responseMessage,
        });
      }
    } catch (err) {
      setAlertMessage({
        type: "error",
        message: "An error occurred while fetching user details",
      });
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row h-100">
        {/* Left Section */}
        <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center left-section text-center">
          <img className="logo_KRPH img-fluid mb-2" src={logo} alt="Logo" />
          <h2 className="text-white">
            Fasal Bima Karao <br /> Suraksha Kawach Pao
          </h2>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center right-section">
          <div className="login-box">
            <h3 className="text">
              KRPH <br /> Agent Training Management
            </h3>
            <p className="text_sub">Please login to continue</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Enter User ID"
                  className="form-control form-control-sm"
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
                  className="form-control form-control-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn custom-button btn-block mt-3">
                SIGN IN
              </button>
              <a href="/" className="d-block mt-2 text-muted">
                Forgot Password? <span className="text-success">Click Here</span>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
