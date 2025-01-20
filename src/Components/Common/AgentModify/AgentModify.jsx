import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-alpine.css';
import "./AgentModify.scss";
import { FaEdit, FaBell, FaBan } from 'react-icons/fa';
import CommonHeader from "../CommonHeader/CommonHeader";
import EditAgent from "../EditAgent/EditAgent"; 
import {getAllAgent} from "./Services/Methods";
const ModifyAgent = () => {
  const [formData, setFormData] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false); 
  const [selectedAgent, setSelectedAgent] = useState(null); 
  const [rowData] = useState([
    {
      agentName: 'Rohit Kumar',
      userName: 'agent-007',
      email: 'yourmail@domain.com',
      mobile: '9012452104',
      designation: 'User Experience Designer',
      region: 'South',
    },
    {
      agentName: 'Rohit Kumar',
      userName: 'agent-007',
      email: 'yourmail@domain.com',
      mobile: '9012452104',
      designation: 'User Experience Designer',
      region: 'North',
    },
      {
      agentName: 'Rohit Kumar',
      userName: 'agent-007',
      email: 'yourmail@domain.com',
      mobile: '9012452104',
      designation: 'User Experience Designer',
      region: 'North',
    },
    // Add more rows as needed
  ]);

  const [columnDefs] = useState([
    { headerName: 'Agent Name', field: 'agentName', sortable: true, filter: true },
    { headerName: 'User Name', field: 'userName', sortable: true, filter: true },
    { headerName: 'Agent Email ID', field: 'email', sortable: true, filter: true },
    { headerName: 'Mobile No.', field: 'mobile', sortable: true, filter: true },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true },
    { headerName: 'Region', field: 'region', sortable: true, filter: true },
    {
      headerName: 'Action',
      field: 'action',
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <FaEdit
            className="icon edit-icon"
            title="Edit"
            onClick={() => handleEdit(params.data)} 
          />
          <FaBell className="icon notify-icon" title="Notify" />
          <FaBan className="icon disable-icon" title="Disable" />
        </div>
      ),
    },
  ]);



  // Function to handle edit click
  const handleEdit = (agentData) => {
    debugger;
    setPopupOpen(true);
    setSelectedAgent(agentData);
     
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedAgent(null);
  };
  useEffect(() => {
    getAllAgent(formData);
  }, [formData]);

  return (
    <>
      <div className="form-wrapper-agent">
        <CommonHeader title="Modify Agent" />
        <div className="modify-agent-container">
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

      {/* Render the popup when isPopupOpen is true */}
      {isPopupOpen && (
        <EditAgent
          agentData={selectedAgent}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default ModifyAgent;
