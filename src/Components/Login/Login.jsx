import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../../Framework/Components/Widgets/Notification/NotificationProvider";
import "./Login.scss";
import logo from "./Assets/logo.png";
import KRPH_logo from "./Assets/KRPH_Logo90.png";
import { authenticate, getUserByID } from "./Services/Methods";
import { decodeJWTToken, setSessionStorage } from "../Login/Auth/auth";

const Login = () => {
  const setAlertMessage = AlertMessage();
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, password } = formData;

    if (!userId || !password) {
      showAlert("error", "Both User ID and Password are required.");
      return;
    }

    try {
      const result = await authenticate(userId, password);
      if (result.responseCode === 1) {
        showAlert("success", "Login Successfully");
        const decodedToken = decodeJWTToken(result.responseData);
        const sessionToken = result.responseData[0]?.token;

        setSessionStorage("token", sessionToken);
        fetchUserDetails(decodedToken, sessionToken);
      } else {
        showAlert("error", result.responseMessage);
      }
    } catch {
      showAlert("error", "An error occurred during login.");
    }
  };

  const fetchUserDetails = async (decodedToken, token) => {
    try {
      const result = await getUserByID(decodedToken, token);
      if (result.responseCode === 1) {
        setSessionStorage("user", result.responseData);
        navigate("/home");
      } else {
        showAlert("error", result.responseMessage);
      }
    } catch {
      showAlert("error", "An error occurred while fetching user details.");
    }
  };

  const showAlert = (type, message) => {
    setAlertMessage({ type, message });
  };

  const handleResetPassword = () => {
    if (!email) {
      showAlert("error", "Please enter a valid email address.");
      return;
    }

    // Simulate API call for password reset
    // setTimeout(() => {
    //   showAlert("success", "Password reset link has been sent to your email.");
    //   setShowResetPopup(false);
    //   setEmail("");
    // }, 1000);
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
          <div className="title-container">
    <h3 className="text-center">KRPH</h3>
    <img src={KRPH_logo} alt="Agent Training Logo" className="login-image" />
  </div>
       
  
            <h5 className="text-center">Agent Training Management</h5>
            <p className="text_sub text-center">Please login to continue</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Enter User ID"
                  className="form-control form-control-sm"
                  value={formData.userId}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="btn custom-button btn-block mt-3"
              >
                SIGN IN
              </button>
              <a
                href="#"
                className="d-block mt-2 text-muted"
              
              >
                Forgot Password?{" "}
                <span className="text-success"   onClick={() => setShowResetPopup(true)}>Click Here</span>
              </a>
            </form>
          </div>
        </div>
      </div>

      {/* Reset Password Popup */}
      {showResetPopup && (
        <div className="reset-popup">
          <div className="reset-popup-content">
            <h4>Reset Password</h4>
            <p>Enter your email to receive a password reset link.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="reset-popup-actions">
              <button
                className="btn btn-primary"
                onClick={handleResetPassword}
              >
                Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowResetPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
