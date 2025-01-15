import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Page/Page";
import PageAuthenticator from "./PageAuthenticator/PageAuthenticator";
import Login from "../../Components/Login/Login";
import Home from "../../Components/Common/Home/Home";
import CreateNewAgent from "../../Components/Common/CreateNewAgent/CreateNewAgent";
import CreateNewTraining from "../../Components/Common/CreateNewTraining/CreateNewTraining";
import ModifyAgent from "../../Components/Common/AgentModify/AgentModify";


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
        <Route
          exact
          path="/CreateNewAgent"
          element={<Page component={<CreateNewAgent />} title="Create New Agent" />}
          
        />
        <Route
          exact
          path="/CreateNewTraining"
          element={<Page component={<CreateNewTraining />} title="Create New Training" />}
          
        />
         <Route
          exact
          path="/ModifyAgent"
          element={<Page component={<ModifyAgent />} title="Modify Agent" />}
          
        />
        
      </Routes>
    </Router>
  );
}

export default PageRouter;
