import React from "react";
import { checkAuthExist } from "Components/Common/Login/Auth/auth";
import { Navigate } from "react-router-dom";

function PageAuthenticator() {
  if (checkAuthExist()) {
   return <Navigate to="/welcome" />;
  }

return <Navigate to="/login" />;
  
}

export default PageAuthenticator;
