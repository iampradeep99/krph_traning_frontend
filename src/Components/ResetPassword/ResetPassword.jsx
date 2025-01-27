import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { AlertMessage } from "../../Framework/Components/Widgets/Notification/NotificationProvider";
import "./ResetPassword.scss";
import logo from "./Assets/logo.png";
import KRPH_logo from "./Assets/KRPH_Logo90.png";
import { resetPassword } from "./Services/Methods";

const ResetPassword = () => {
  const setAlertMessage = AlertMessage();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    token: "",
    userId: "", // Add userId state
  });
  const [showResetPopup, setShowResetPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Set the token and userId only if they haven't been set yet
        if (decoded.userId && formData.token !== token) {
          setFormData((prevData) => ({
            ...prevData,
            token: token,
            userId: decoded.userId, // Only update userId if it's not already set
          }));
        }
      } catch (error) {
        showAlert("error", "Invalid token.");
        navigate("/login");
      }
    } else {
      showAlert("error", "Token not found in URL.");
      navigate("/login");
    }
  }, [token, formData.token, navigate, setAlertMessage]); // Only run when token or formData.token changes

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

    const { newPassword, confirmPassword, token, userId } = formData;

    if (!newPassword || !confirmPassword) {
      showAlert("error", "Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("error", "Passwords do not match.");
      return;
    }
    try {
      let payload = {
        userId,
        password: newPassword,
        confirmPassword,
        token,
      }
      alert(JSON.stringify(payload));
      let data = await resetPassword(payload);

      if (data.responseCode === 1) {
        showAlert("success", "Your password has been reset successfully.");
        setFormData({ newPassword: "", confirmPassword: "" });
        navigate("/login");
      } else {
        showAlert("error", data.responseMessage || "Something went wrong.");
      }
    } catch (error) {
      alert(error)
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
            <p className="text_sub text-center">Reset Password</p>

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter New Password"
                  className="form-control form-control-sm"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="form-control form-control-sm"
                  value={formData.confirmPassword}
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

      {/* Reset Password Popup (if needed) */}
      {showResetPopup && (
        <div className="reset-popup">
          <div className="reset-popup-content">
            <h4>Reset Password</h4>
            <p>Enter your new password below.</p>
            <input
              type="password"
              placeholder="Enter new password"
              className="form-control"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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

export default ResetPassword;
