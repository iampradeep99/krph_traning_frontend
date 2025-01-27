import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../../Framework/Components/Widgets/Notification/NotificationProvider";
import "./ForgetPassword.scss";
import logo from "./Assets/logo.png";
import KRPH_logo from "./Assets/KRPH_Logo90.png";
import { authenticate, forgetPassword, getUserByID } from "./Services/Methods";
import { decodeJWTToken, setSessionStorage } from "../Login/Auth/auth";

const ForgetPassword = () => {
  const setAlertMessage = AlertMessage();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [showResetPopup, setShowResetPopup] = useState(false);
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    setAlertMessage({ type, message });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); 
  
    if (!formData.email) {
      showAlert("error", "Please enter a valid email address.");
      return;
    }
  
    try {
     let data =  await forgetPassword(formData.email);
      if(data.responseCode == 1){
        showAlert("success", "Password reset link has been sent to your email.");
        setFormData({ email: "" }); 
        navigate('/login')
      }
      
    } catch (error) {
      showAlert("error", "Something went wrong. Please try again.");
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
            <div className="title-container">
              <h3 className="text-center">KRPH</h3>
              <img
                src={KRPH_logo}
                alt="Agent Training Logo"
                className="login-image"
              />
            </div>

            <h5 className="text-center">Agent Training Management</h5>
            <p className="text_sub text-center">Forget Password</p>

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="form-control form-control-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="btn custom-button btn-block mt-3"
              >
                Submit
              </button>
              <a href="#" className="d-block mt-2 text-muted">
                Login?{" "}
                <span
                  className="text-success"
                  onClick={() => navigate("/login")}
                >
                  Click Here
                </span>
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="reset-popup-actions">
              <button className="btn btn-primary" onClick={handleResetPassword}>
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

export default ForgetPassword;
