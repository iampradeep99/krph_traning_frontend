import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../Components/Login/Login"; // Import your Login page
import Layout from "../../Components/Layout/Layout";
// import Dashboard from "../../Components/Dashboard/Dashboard"; // Example: Admin Dashboard


function PageRouter() {
  return (
    <Router>
      <Routes>
        {/* ------------ Public Routes ------------ */}
        <Route
          exact
          path="/"
          element={<Login title="Welcome to PMFBY" />} // No layout for Login page
        />
        
        {/* ------------ Protected Routes with Layout ------------ */}
        <Route
          path="/"
          element={
            <Layout>
              {/* <Dashboard />  Dashboard Page */}
            </Layout>
          }
        />
      

      </Routes>
    </Router>
  );
}

export default PageRouter;
