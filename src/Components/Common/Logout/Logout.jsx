import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../../../Framework/Components/Widgets/Notification/NotificationProvider";

const Logout = () => {
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();

  const signOut = async () => {
    try {
      sessionStorage.clear();
      navigate("/login");
      setAlertMessage({
        type: "success",
        message: "You have been successfully logged out.",
      });
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error.message,
      });
    }
  };

  useEffect(() => {
    signOut();
  }, []);

  return <></>;
};

export default Logout;
