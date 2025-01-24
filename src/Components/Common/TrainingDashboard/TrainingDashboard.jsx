import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./TrainingDashboard.scss";
import TrainingSummaryCommon from "./TrainingSummaryCommon/TrainingSummaryCommon";
import logouser from "./Assets/Card_logo.svg";
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TrainingDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAgents: 500,
    activeAgents: 275,
    inactiveAgents: 225,
    newOnboarding: 50,
    disabledAgents: 5,
    terminatedAgents: 50,
    totalTraining: 1200,
    completed: 654,
    pending: 546,
    regionWiseTraining: {
      east: 340,
      west: 280,
      north: 330,
      south: 250,
    },
    moduleWiseTraining: {
      onboard: 300,
      refresher: 320,
      softSkills: 300,
      technicalSkills: 280,
    },
    stateWiseDetails: {
      Delhi: 80,
      Rajasthan: 70,
      UttarPradesh: 60,
      Punjab: 50,
      Bihar: 40,
      Telangana: 30,
      Maharashtra: 20,
    },
    trainingStatus: {
      batch: 256,
      module: 944,
    },
  });

  // Utility function to capitalize words
  const capitalize = (str) =>
    str.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());

  return (
    <div className="form-wrapper-training">
      <h1 style={{display: "flex",justifyContent: "center"}}>Training Dashboard Coming Soon !</h1>
      {/* <div className="training-dashboard">
        
        <div className="summary">
          {[
            { label: "Total Agents", value: dashboardData.totalAgents },
            { label: "Active Agents", value: dashboardData.activeAgents },
            { label: "Inactive Agents", value: dashboardData.inactiveAgents },
            { label: "New Onboarding", value: dashboardData.newOnboarding },
            { label: "Disabled Agents", value: dashboardData.disabledAgents },
            {
              label: "Terminated Agents",
              value: dashboardData.terminatedAgents,
            },
          ].map((item, index) => (
            <div className="card" key={index}>
              <img src={logouser}></img>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        Current Status Section
        <TrainingSummaryCommon />
        <div className="current-status">
      <TrainingSummaryCommon/>
      </div>

        State-Wise Details Section
        <div className="state-wise-details">
        <h3>State Wise Agent Details</h3>
        {Object.entries(dashboardData.stateWiseDetails).map(([state, value], index) => (
          <div key={index} className="state-bar">
            <span>{state}</span>
            <div className="bar" style={{ width: `${value}%` }}>
              <span className="bar-value">{value}%</span>
            </div>
          </div>
        ))}
      </div>
      </div> */}
    </div>
  );
};

export default TrainingDashboard;
