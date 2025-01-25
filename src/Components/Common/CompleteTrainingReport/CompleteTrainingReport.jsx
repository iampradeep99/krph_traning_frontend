import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./CompleteTrainingReport.scss";
import CommonHeader from "../CommonHeader/CommonHeader";

const CompleteTrainingReport = () => {
    const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
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
    {
      headerName: "Agent Name",
      field: "agentName",
      sortable: true,
      filter: true,
    },
    { headerName: "Mobile No.", field: "mobile", sortable: true, filter: true },
    {
      headerName: "Agent Mail ID",
      field: "email",
      sortable: true,
      filter: true,
    },
    { headerName: "Location", field: "location", sortable: true, filter: true },
    {
      headerName: "No. of Days",
      field: "noOfDays",
      sortable: true,
      filter: true,
    },
    {
      headerName: "No. of Month",
      field: "noOfMonths",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Training Module",
      field: "trainingModule",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Training Hrs Completed",
      field: "trainingHrsCompleted",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Progress Bar",
      field: "progress",
      cellRendererFramework: (params) => (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${params.value}%`,
              backgroundColor:
                params.value > 70
                  ? "#16A34A"
                  : params.value > 40
                    ? "#FFC107"
                    : "#FF3B30",
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
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
       <i className="fas fas fa-arrow-left"></i>
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
      <i className="fas fas fa-arrow-right"></i>
      </button>
    </div>
  );

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
          // rowData={filteredData}
          rowData={rowData}
          columnDefs={[
            { 
              headerName: "S.No", 
              valueGetter: (params) => params.node.rowIndex + 1, 
              width: 80 ,
              cellStyle: { marginLeft: '20px' } 
            }, ...columnDefs,
        
           
          ]}
          defaultColDef={{ resizable: true, sortable: true, cellStyle: { marginLeft: '15px' }  }}
          rowHeight={30} 
        />
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default CompleteTrainingReport;
