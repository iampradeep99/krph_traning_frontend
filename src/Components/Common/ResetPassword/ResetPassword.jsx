import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setSuccess(null);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      setSuccess(null);
      return;
    }

    // Here, add the logic to handle password reset (e.g., API call)
    // Simulate success
    setSuccess("Your password has been reset successfully.");
    setError(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "16px" }}>Reset Password</h2>
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row"style={{ marginBottom: "15px" }}>
            <div className="form-group">
          <label
            htmlFor="currentPassword"
            style={{ display: "block", marginBottom: "5px", fontSize: "10px" }}
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter Current Password"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "10px",
            }}
          />
          </div>
          <div className="form-group"style={{ marginBottom: "15px" }}>
          <label
            htmlFor="newPassword"
            style={{ display: "block", marginBottom: "5px", fontSize: "10px" }}
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "10px",
            }}
          />
        </div>
        <div  className="form-group"style={{ marginBottom: "15px" }}>
          <label
            htmlFor="confirmPassword"
            style={{ display: "block", marginBottom: "5px", fontSize: "10px" }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "10px",
            }}
          />
        </div>
        </div>

      

       

       
      </form>
      <button
          type="submit"
          style={{
            width: "50%",
            padding: "10px",
            backgroundColor: "#054a06",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "10px",
     
          }}
        >
          Reset Password
        </button>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "15px",
          width: "50%",
          padding: "10px",
          backgroundColor: "#ccc",
          color: "#333",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "10px",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default ResetPassword;
