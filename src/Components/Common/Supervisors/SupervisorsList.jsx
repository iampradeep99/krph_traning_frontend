import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./SupervisorList.scss";
import { FaEdit, FaBell, FaBan } from "react-icons/fa";
import CommonHeader from "../CommonHeader/CommonHeader";
import EditAgent from "../EditAgent/EditAgent";
import { getAllAgent } from "./Services/Methods";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";
import debounce from "lodash.debounce";

const SupervisorList = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); 

  const [columnDefs] = useState([
    {
      headerName: "Supervisor Name",
      field: "fullName",
      valueGetter: (params) =>
        `${
          changeToCapitalize(params.data.firstName)
            ? changeToCapitalize(params.data.firstName)
            : "NA"
        } ${changeToCapitalize(params.data.lastName) ? changeToCapitalize(params.data.lastName) : "NA"}`,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Supervisor Email ID",
      field: "email",
      valueGetter: (params) => (params.data.email ? params.data.email : "NA"),
      sortable: true,
      filter: true,
    },
    {
      headerName: "Mobile No.",
      field: "mobile",
      valueGetter: (params) => (params.data.mobile ? params.data.mobile : "NA"),
      sortable: true,
      filter: true,
    },
    {
      headerName: "Designation",
      field: "designation",
      valueGetter: (params) => {
        if (params.data.role === 2) {
          return "Supervisor";
        }
        return changeToCapitalize(params.data.designation)
          ? changeToCapitalize(params.data.designation)
          : "NA";
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Region",
      valueGetter: (params) =>
        params.data.region.name ? params.data.region.name : "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "State",
      valueGetter: (params) =>
        params.data.state?.name ? params.data.state?.name : "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      valueGetter: (params) =>
        params.data.city?.name ? params.data.city?.name : "NA",
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
    navigate("/addSupervisor");
  };

  const getAllAgentData = async (page, searchQuery) => {
    try {
      const formData = {
        page,
        limit: 10,
        searchQuery,
        role: 2,
      };
      const result = await getAllAgent(formData);
      if (result.response.responseCode === 1) {
        const agents = result.response.responseData.agents;
        setRowData(agents);
        setFilteredData(agents);
        
        if (agents.length === 0) {
          setFilteredData([]);
        }
        
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

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length >= 4) {
        getAllAgentData(1, query);
      }
    }, 300),
    [] 
  );

  useEffect(() => {
    getAllAgentData(currentPage, ""); 
  }, [currentPage]);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
    
    if (query === "") {
      getAllAgentData(1, ""); 
    } else {
      debouncedSearch(query); 
    }
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
    <>
      <div className="form-wrapper-agent">
        <CommonHeader title="Supervisor" />
        <div className="modify-agent-container">
          <div className="top-actions">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter admin name or user ID to search..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
              />
              <button
                className="search-button-download"
                onClick={() => debouncedSearch(searchQuery)}
              >
                Search
              </button>
            </div>
            <button className="create-agent-button" onClick={handleCreateAgent}>
            Add Supervisor
              &nbsp; <i className="fas fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="ag-theme-alpine ag-grid-container">
            {filteredData?.length === 0 ? (
              <div className="no-records-found">No records found</div>
            ) : (
              <AgGridReact rowData={filteredData} columnDefs={columnDefs} />
            )}
          </div>
          {renderPagination()}
        </div>
      </div>

      {isPopupOpen && <EditAgent agentData={selectedAgent} onClose={handleClosePopup} />}
    </>
  );
};

export default SupervisorList;
