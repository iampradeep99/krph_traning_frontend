
import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Page/Page";
import PageAuthenticator from "./PageAuthenticator/PageAuthenticator";
import Login from "../../Components/Login/Login";
import Home from "../../Components/Common/Home/Home";


function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageAuthenticator />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/home"
          element={<Page component={<Home />} title="Home" />}
        />
       
        
      </Routes>
    </Router>
  );
}

export default PageRouter;