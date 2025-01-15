import React from "react";
import { checkAuthExist } from "../../../Components/Login/Auth/auth";
import { Navigate } from "react-router-dom";

function PageAuthenticator() {
  if (checkAuthExist()) {
    return <Navigate to="/home" />;
  }

  return <Navigate to="/login" />;
}

export default PageAuthenticator;
