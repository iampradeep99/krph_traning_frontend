import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./AgentModify.scss";
import { FaEdit, FaBell, FaBan } from "react-icons/fa";
import CommonHeader from "../CommonHeader/CommonHeader";
import EditAgent from "../EditAgent/EditAgent";
import { getAllAgent } from "./Services/Methods";

const ModifyAgent = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Number of records per page

  const [columnDefs] = useState([
    {
      headerName: "Agent Name",
      field: "fullName",
      valueGetter: (params) =>
        `${params.data.firstName || ""} ${params.data.lastName || ""}`,
      sortable: true,
      filter: true,
    },
    { headerName: "User Name", field: "userID", sortable: true, filter: true },
    {
      headerName: "Agent Email ID",
      field: "email",
      sortable: true,
      filter: true,
    },
    { headerName: "Mobile No.", field: "mobile", sortable: true, filter: true },
    {
      headerName: "Designation",
      field: "designation",
      sortable: true,
      filter: true,
    },
    {
      headerName: "State",
      valueGetter: (params) => params.data.state?.name || "",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      valueGetter: (params) => params.data.city?.name || "",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Action",
      field: "action",
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

  const handleEdit = (agentData) => {
    setPopupOpen(true);
    setSelectedAgent(agentData);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedAgent(null);
  };

  const handleCreateAgent = () => {
    navigate("/CreateNewAgent");
  };

  const getAllAgentData = async (page) => {
    try {
      // const formData = { page, limit };
      const formData = {
        page: page,
        limit: 10,
        searchQuery: "",
        role: 3,
      };
      const result = await getAllAgent(formData);
      if (result.response.responseCode === 1) {
        setRowData(result.response.responseData.agents);
        setFilteredData(result.response.responseData.agents); // Initialize filtered data
        setTotalPages(result.response.responseData.totalPages);
      } else {
        setRowData([]);
        setFilteredData([]);
        console.error(result.response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllAgentData(currentPage); // Fetch data for the current page
  }, [currentPage]);

  // Live search as user types
  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  // Search button functionality
  const handleSearchButtonClick = () => {
    filterData(searchQuery);
  };

  // Filter data logic
  const filterData = (query) => {
    const filtered = rowData.filter(
      (agent) =>
        agent.firstName.toLowerCase().includes(query.toLowerCase()) ||
        agent.lastName.toLowerCase().includes(query.toLowerCase()) ||
        agent.userID?.toLowerCase().includes(query.toLowerCase()) ||
        agent.email?.toLowerCase().includes(query.toLowerCase()) ||
        agent.designation?.toLowerCase().includes(query.toLowerCase()) ||
        agent.mobile?.includes(query) ||
        agent.state?.name.toLowerCase().includes(query.toLowerCase()) ||
        agent.city?.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

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
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );

  return (
    <>
      <div className="form-wrapper-agent">
        <CommonHeader title="Modify Agent" />
        <div className="modify-agent-container">
          <div className="top-actions">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter agent name or user ID to search..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
              />
              <button
                className="search-button-download"
                onClick={handleSearchButtonClick}
              >
                Search
              </button>
            </div>
            <button className="create-agent-button" onClick={handleCreateAgent}>
              Create Agent &nbsp; <i className="fas fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="ag-theme-alpine ag-grid-container">
            <AgGridReact rowData={filteredData} columnDefs={columnDefs} />
          </div>
          {renderPagination()}
        </div>
      </div>

      {isPopupOpen && (
        <EditAgent agentData={selectedAgent} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default ModifyAgent;
