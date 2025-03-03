// import React from "react";
// import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
// import Page from "./Page/Page";
// import PageAuthenticator from "./PageAuthenticator/PageAuthenticator";
// import Login from "../../Components/Login/Login";
// import Home from "../../Components/Common/Home/Home";
// import CreateNewAgent from "../../Components/Common/CreateNewAgent/CreateNewAgent";
// import CreateNewTraining from "../../Components/Common/CreateNewTraining/CreateNewTraining";
// import ModifyAgent from "../../Components/Common/AgentModify/AgentModify";
// import AdminList from "../../Components/Common/Admin/AdminList";

// import CompleteTrainingReport from "../../Components/Common/CompleteTrainingReport/CompleteTrainingReport";
// import UserSetting from "../../Components/Common/UserSetting/UserSetting";
// import Logout from "../../Components/Common/Logout/Logout";
// TrainingDashboard;
// import TrainingDashboard from "../../Components/Common/TrainingDashboard/TrainingDashboard";
// import CreateNewAdmin from "../../Components/Common/CreateAdmin/CreateNewAdmin";
// import SupervisorList from "../../Components/Common/Supervisors/SupervisorsList";
// import AddSupervisor from "../../Components/Common/AddSupervisor/AddSupervisor";

// function PageRouter() {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<PageAuthenticator />} />
//         <Route exact path="/login" element={<Login />} />
//         <Route
//           exact
//           path="/home"
//           element={<Page component={<TrainingDashboard />} title="Home" />}
//         />
//         <Route
//           exact
//           path="/dashboard/TrainingDashboard"
//           element={<Page component={<TrainingDashboard />} title="Home" />}
//         />

//         <Route
//           exact
//           path="/CreateNewAgent"
//           element={
//             <Page component={<CreateNewAgent />} title="Create New Agent" />
//           }
//         />
//         <Route
//           exact
//           path="/reports"
//           element={
//             <Page
//               component={<CompleteTrainingReport />}
//               title="Complete Training Report"
//             />
//           }
//         />
//         <Route
//           exact
//           path="/CreateNewTraining"
//           element={
//             <Page
//               component={<CreateNewTraining />}
//               title="Create New Training"
//             />
//           }
//         />

//         <Route
//           exact
//           path="/agents/List"
//           element={<Page component={<ModifyAgent />} title="Modify Agent" />}
//         />
//         <Route
//           exact
//           path="/logout"
//           element={<Page component={<Logout />} title="logout" />}
//         />
//         <Route
//           exact
//           path="/settings"
//           element={<Page component={<UserSetting />} title="User Setting" />}
//         />
//         <Route
//           exact
//           path="/TrainingDashboard"
//           element={
//             <Page
//               component={<TrainingDashboard />}
//               title="Training Dashboard"
//             />
//           }
//         />
//         <Route
//           exact
//           path="/admins"
//           element={<Page component={<AdminList />} title="Admins" />}
          
//         />
//          <Route
//           exact
//           path="/addAdmin"
//           element={<Page component={<CreateNewAdmin />} title="Admins" />}
          
//         />
//         <Route
//           exact
//           path="/supervisors"
//           element={<Page component={<SupervisorList />} title="Supervisors" />}
          
//         />

//         <Route
//           exact
//           path="/addSupervisor"
//           element={<Page component={<AddSupervisor />} title="Add Supervisor" />}
          
//         />
        
//       </Routes>
//     </Router>
//   );
// }

// export default PageRouter;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import TrainingDashboard from "../../Components/Common/TrainingDashboard/TrainingDashboard";
import CreateNewAdmin from "../../Components/Common/CreateAdmin/CreateNewAdmin";
import SupervisorList from "../../Components/Common/Supervisors/SupervisorsList";
import AddSupervisor from "../../Components/Common/AddSupervisor/AddSupervisor";
import UpcomingTraining from "../../Components/Common/UpComingTraining/UpComingTraining";
import CompletedTraining from "../../Components/CompletedTraining/CompletedTraining";
import Profile from "../../Components/Common/Profile/Profile";
import ForgetPassword from "../../Components/ForgetPassword/ForgetPassword";
import ResetPassword from "../../Components/ResetPassword/ResetPassword";

import updatePassword from "../../Components/Common/ResetPassword/ResetPassword";

function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageAuthenticator />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget-password" element={<ForgetPassword/>} />
        <Route exact path="/reset-password" element={<ResetPassword/>} />

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
          element={
            <Page component={<CreateNewAgent />} title="Create New Agent" />
          }
        />
         <Route
          exact
          path="/training/UpcomingTraining"
          element={
            <Page component={<UpcomingTraining />} title="Upcoming Training" />
          }
        />
         <Route
          exact
          path="/training/CompletedTraining"
          element={
            <Page component={<CompletedTraining />} title="Completed Training" />
          }
        />
         <Route
          exact
          path="/update-password"
          element={
            <Page component={<updatePassword />} title="reset password" />
          }
        />
          <Route
          exact
          path="/profile"
          element={
            <Page component={<Profile />} title="Profile" />
          }
        />
        <Route
          exact
          path="/reports"
          element={
            <Page
              component={<CompleteTrainingReport />}
              title="Complete Training Report"
            />
          }
        />
        <Route
          exact
          path="/CreateNewTraining"
          element={
            <Page
              component={<CreateNewTraining />}
              title="Create New Training"
            />
          }
        />
        <Route
          exact
          path="/agents"
          element={<Page component={<ModifyAgent />} title="Modify Agent" />}
        />
        <Route
          exact
          path="/logout"
          element={<Page component={<Logout />} title="Logout" />}
        />
        <Route
          exact
          path="/settings"
          element={<Page component={<UserSetting />} title="User Setting" />}
        />
        <Route
          exact
          path="/TrainingDashboard"
          element={
            <Page
              component={<TrainingDashboard />}
              title="Training Dashboard"
            />
          }
        />
        <Route
          exact
          path="/admins"
          element={<Page component={<AdminList />} title="Admins" />}
        />
        <Route
          exact
          path="/addAdmin"
          element={<Page component={<CreateNewAdmin />} title="Add Admin" />}
        />
        <Route
          exact
          path="/supervisors"
          element={<Page component={<SupervisorList />} title="Supervisors" />}
        />
        <Route
          exact
          path="/addSupervisor"
          element={<Page component={<AddSupervisor />} title="Add Supervisor" />}
        />
      </Routes>
    </Router>
  );
}

export default PageRouter;

