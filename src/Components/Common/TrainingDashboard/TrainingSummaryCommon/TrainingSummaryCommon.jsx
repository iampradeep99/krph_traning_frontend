import React from "react";
import "./TrainingSummaryCommon.scss";

const TrainingSummaryCommon = () => {
  const trainingData = {
    totalTraining: 1200,
    month: "November 2024",
    status: { completed: 654, pending: 546 },
    regionWise: {
      East: 340,
      West: 280,
      North: 330,
      South: 250,
    },
    moduleWise: {
      Onboard: 300,
      Refresher: 320,
      "Soft Skills": 300,
      "Technical Skills": 280,
    },
  };

  return (
    <div className="training-summary">
      <h2>Current Month Training Status</h2>
      <h3>{trainingData.month}</h3>
      {/* <button className="export-button">
        <img src="/icons/export-icon.png" alt="Export Icon" />
        Export
      </button> */}
      <div className="summary-cards">
        {/* Total Training Card */}
        <div className="card">
          <div className="card-content">
            <h4>Total Training</h4>
            <h1>{trainingData.totalTraining}</h1>
            <p>Till {trainingData.month}</p>
          </div>
          <div className="icon">
            <img src="/icons/training-icon.png" alt="Training Icon" />
          </div>
        </div>

        {/* Status Card */}
        <div className="card">
          <h4>Status</h4>
          <div className="status">
            <p>
              <span className="count">{trainingData.status.completed}</span>{" "}
              Completed
            </p>
            <p>
              <span className="count">{trainingData.status.pending}</span>{" "}
              Pending
            </p>
          </div>
        </div>

        {/* Region Wise Training Card */}
        <div className="card">
          <h4>Region Wise Training</h4>
          <div className="region-wise">
            {Object.entries(trainingData.regionWise).map(([region, count]) => (
              <p key={region}>
                <span className="region">{region}</span>: {count}
              </p>
            ))}
          </div>
        </div>

        {/* Module Wise Training Card */}
        <div className="card">
          <h4>Module Wise Training</h4>
          <div className="module-wise">
            {Object.entries(trainingData.moduleWise).map(([module, count]) => (
              <p key={module}>
                <span className="module">{module}</span>: {count}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSummaryCommon;
