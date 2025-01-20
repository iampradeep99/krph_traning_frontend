import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./CompleteTrainingReport.scss";
import CommonHeader from "../CommonHeader/CommonHeader";


const CompleteTrainingReport = () => {
  const [rowData] = useState([
    {
      agentName: "Rohit Kumar",
      mobile: "9012452104",
      email: "rohit@domain.com",
      location: "DEL",
      noOfDays: 71,
      noOfMonths: 3,
      trainingModule: "Batch",
      trainingHrsCompleted: 20,
      progress: 55,
      agentStatus: "Active",
    },
    {
      agentName: "Vimal Jogesh",
      mobile: "9717965288",
      email: "vimal@domain.com",
      location: "NOI",
      noOfDays: 57,
      noOfMonths: 2,
      trainingModule: "Batch",
      trainingHrsCompleted: 16,
      progress: 85,
      agentStatus: "Disabled",
    },
    {
      agentName: "Sumit",
      mobile: "9717965288",
      email: "sumit@domain.com",
      location: "RAJ",
      noOfDays: 52,
      noOfMonths: 2,
      trainingModule: "Batch",
      trainingHrsCompleted: 5,
      progress: 25,
      agentStatus: "Active",
    },
    // Add more rows as needed
  ]);

  const [columnDefs] = useState([
    { headerName: "Agent Name", field: "agentName", sortable: true, filter: true },
    { headerName: "Mobile No.", field: "mobile", sortable: true, filter: true },
    { headerName: "Agent Mail ID", field: "email", sortable: true, filter: true },
    { headerName: "Location", field: "location", sortable: true, filter: true },
    { headerName: "No. of Days", field: "noOfDays", sortable: true, filter: true },
    { headerName: "No. of Month", field: "noOfMonths", sortable: true, filter: true },
    { headerName: "Training Module", field: "trainingModule", sortable: true, filter: true },
    { headerName: "Training Hrs Completed", field: "trainingHrsCompleted", sortable: true, filter: true },
    {
      headerName: "Progress Bar",
      field: "progress",
      cellRendererFramework: (params) => (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${params.value}%`,
              backgroundColor: params.value > 70 ? "#16A34A" : params.value > 40 ? "#FFC107" : "#FF3B30",
            }}
          ></div>
          <span>{params.value}%</span>
        </div>
      ),
    },
    {
      headerName: "Agent Status",
      field: "agentStatus",
      cellRendererFramework: (params) => (
        <span
          className={`status-badge ${params.value === "Active" ? "active" : "disabled"}`}
        >
          {params.value}
        </span>
      ),
    },
  ]);

  return (
    <div className="form-wrapper-agent-Report">

<CommonHeader title="Complete Training Report" />
    
    <div className="completed-training-report">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter agent name or user ID to search..."
        />
        <button className="search-button-download">Search</button>
      </div>
      <div className="ag-theme-alpine ag-grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>
    </div>
    </div>
  );
};

export default CompleteTrainingReport;
