import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./AdminList.scss";
import { FaEdit, FaBan } from "react-icons/fa";
import CommonHeader from "../CommonHeader/CommonHeader";
import EditAgent from "../EditAgent/EditAgent";
import { getAllAgent } from "./Services/Methods";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";
import debounce from "lodash.debounce"; // Import debounce function

const AdminList = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);  // Always initialize as an array
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Number of records per page

  const [columnDefs] = useState([
    {
      headerName: "Action",
      field: "action",
      width: 100,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <FaEdit
            className="icon edit-icon"
            title="Edit"
            onClick={() => handleEdit(params.data)}
          />
         
          <FaBan className="icon disable-icon" title="Disable" />
        </div>
      ),
    },
    {
      headerName: "Admin Name",
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
      headerName: "Admin Email ID",
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
        if (params.data.role === 1) {
          return "Admin";
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
    navigate("/addAdmin");
  };

  const getAllAgentData = async (page, searchQuery) => {
    try {
      const formData = {
        page,
        limit: 10,
        searchQuery,
        role: 1,
      };
      const result = await getAllAgent(formData);
      if (result.response.responseCode === 1) {
        const agents = result.response.responseData.agents;
        setRowData(agents);
        setFilteredData(agents); // Initialize filtered data
        
        // If no records are found, display a message
        if (agents.length === 0) {
          setFilteredData([]);
        }
        
        setTotalPages(result.response.responseData.totalPages);
      } else {
        setRowData([]);
        setFilteredData([]); // Reset filtered data if no agents found
        console.error(result.response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Debounced function for API call
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length >= 4) {
        getAllAgentData(1, query); // Fetch data when 4 or more characters are entered
      }
    }, 300),
    [] // This ensures the function is only created once
  );

  useEffect(() => {
    getAllAgentData(currentPage, ""); // Initial data fetch
  }, [currentPage]);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
    
    if (query === "") {
      // If the search query is empty, fetch all data and reset filtered data
      getAllAgentData(1, ""); // Fetch all agents when the search query is empty
    } else {
      debouncedSearch(query); // Call the debounced search function
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
        <CommonHeader title="Admins" />
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
              Add Admin
              &nbsp; <i className="fas fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="ag-theme-alpine ag-grid-container">
            {filteredData?.length === 0 ? (
              <div className="no-records-found">No records found</div> // Show message when no records are found
            ) : (
            
                     <AgGridReact
                rowData={filteredData}
                columnDefs={[
                  { 
                    headerName: "S.No", 
                    valueGetter: (params) => params.node.rowIndex + 1, 
                    width: 80 ,
                    cellStyle: { marginLeft: '20px' } 
                  }, ...columnDefs,
                  {
                    headerName: "Agent Email ID",
                    field: "email",
                    width: 250, 
                  },
                 
                 
                ]}
                defaultColDef={{ resizable: true, sortable: true, cellStyle: { marginLeft: '15px' }  }}
                rowHeight={30} 
              />
            )}
          </div>
          {renderPagination()}
        </div>
      </div>

      {isPopupOpen && <EditAgent agentData={selectedAgent} onClose={handleClosePopup} />}
    </>
  );
};

export default AdminList;
