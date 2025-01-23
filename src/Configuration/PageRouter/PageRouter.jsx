import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Page/Page";
import PageAuthenticator from "./PageAuthenticator/PageAuthenticator";
import Login from "../../Components/Login/Login";
import Home from "../../Components/Common/Home/Home";
import CreateNewAgent from "../../Components/Common/CreateNewAgent/CreateNewAgent";
import CreateNewTraining from "../../Components/Common/CreateNewTraining/CreateNewTraining";
import ModifyAgent from "../../Components/Common/AgentModify/AgentModify";
import AdminList from "../../Components/Common/Admin/AdminList";

import CompleteTrainingReport from "../../Components/Common/CompleteTrainingReport/CompleteTrainingReport";
import UserSetting from "../../Components/Common/UserSetting/UserSetting";
import Logout from "../../Components/Common/Logout/Logout";
TrainingDashboard
import TrainingDashboard from "../../Components/Common/TrainingDashboard/TrainingDashboard";
import CreateNewAdmin from "../../Components/Common/CreateAdmin/CreateNewAdmin";

function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageAuthenticator />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/home"
          element={<Page component={<TrainingDashboard />} title="Home" />}
          
        />
        <Route
          exact
          path="/dashboard/TrainingDashboard"
          element={<Page component={<TrainingDashboard />} title="Home" />}
          
        />

        <Route
          exact
          path="/CreateNewAgent"
          element={<Page component={<CreateNewAgent />} title="Create New Agent" />}
          
        />
        <Route
          exact
          path="/reports"
          element={<Page component={<CompleteTrainingReport />} title="Complete Training Report" />}
          
        />
        <Route
          exact
          path="/CreateNewTraining"
          element={<Page component={<CreateNewTraining />} title="Create New Training" />}
          
        />

          <Route
          exact
          path="/agents/List"
          element={<Page component={<ModifyAgent />} title="Modify Agent" />}
          
        />
         <Route
          exact
          path="/logout"
          element={<Page component={<Logout />} title="logout" />}
          
        />
          <Route
          exact
          path="/settings"
          element={<Page component={<UserSetting />} title="User Setting" />}
          
        />
          <Route
          exact
          path="/TrainingDashboard"
          element={<Page component={<TrainingDashboard />} title="Training Dashboard" />}
          
        />
        <Route
          exact
          path="/admins"
          element={<Page component={<AdminList />} title="Admins" />}
          
        />
         <Route
          exact
          path="/addAdmin"
          element={<Page component={<CreateNewAdmin />} title="Admins" />}
          
        />
        
      </Routes>
    </Router>
  );
}

export default PageRouter;
