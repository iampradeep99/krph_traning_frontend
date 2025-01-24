// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise/dist/styles/ag-grid.css";
// import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
// import "./AgentModify.scss";
// import { FaEdit, FaBell, FaBan } from "react-icons/fa";
// import CommonHeader from "../CommonHeader/CommonHeader";
// import EditAgent from "../EditAgent/EditAgent";
// import { getAllAgent } from "./Services/Methods";
// import {changeToCapitalize} from '../../../Service/Utilities/Utils'

// const ModifyAgent = () => {
//   const navigate = useNavigate();
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [rowData, setRowData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit] = useState(10); // Number of records per page



//   const [columnDefs] = useState([
//     {
//       headerName: "Agent Name",
//       field: "fullName",
//       valueGetter: (params) => `${ changeToCapitalize(params.data.firstName) ? changeToCapitalize(params.data.firstName) : "NA"} ${changeToCapitalize(params.data.lastName)?changeToCapitalize(params.data.lastName):"NA"}`,
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "User Name",
//       field: "userID",
//       valueGetter: (params) => params.data.userName ? params.data.userName : "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Agent Email ID",
//       field: "email",
//       valueGetter: (params) =>  params.data.email ? params.data.email:"NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Mobile No.",
//       field: "mobile",
//       valueGetter: (params) => params.data.mobile ? params.data.mobile : "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Designation",
//       field: "designation",
//       valueGetter: (params) =>  changeToCapitalize(params.data.designation) ? changeToCapitalize(params.data.designation) : "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Region",
//       valueGetter: (params) => params.data.region.name ? params.data.region.name : "NA", 
//       sortable: true,
//       filter: true,
//     },

//     {
//       headerName: "State",
//       valueGetter: (params) => params.data.state?.name ? params.data.state?.name  : "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "City",
//       valueGetter: (params) => params.data.city?.name ? params.data.city?.name : "NA" ,
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Action",
//       field: "action",
//       cellRendererFramework: (params) => (
//         <div className="action-icons">
//           <FaEdit
//             className="icon edit-icon"
//             title="Edit"
//             onClick={() => handleEdit(params.data)}
//           />
//           <FaBell className="icon notify-icon" title="Notify" />
//           <FaBan className="icon disable-icon" title="Disable" />
//         </div>
//       ),
//     },
//   ]);

//   const handleEdit = (agentData) => {
//     setPopupOpen(true);
//     setSelectedAgent(agentData);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//     setSelectedAgent(null);
//   };

//   const handleCreateAgent = () => {
//     navigate("/CreateNewAgent");
//   };

//   const getAllAgentData = async (page) => {
//     try {
//       // const formData = { page, limit };
//       const formData = {
//         page: page,
//         limit: 10,
//         searchQuery: "",
//         role: 3,
//       };
//       const result = await getAllAgent(formData);
//       if (result.response.responseCode === 1) {
//         console.log(result.response.responseData.agents, "result.response.responseData.agents")
//         setRowData(result.response.responseData.agents);
//         setFilteredData(result.response.responseData.agents); // Initialize filtered data
//         setTotalPages(result.response.responseData.totalPages);
//       } else {
//         setRowData([]);
//         setFilteredData([]);
//         console.error(result.response.responseMessage);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getAllAgentData(currentPage); // Fetch data for the current page
//   }, [currentPage]);

//   // Live search as user types
//   const handleSearchInputChange = (query) => {
//     setSearchQuery(query);
//     filterData(query);
//   };

//   // Search button functionality
//   const handleSearchButtonClick = () => {
//     filterData(searchQuery);
//   };

//   // Filter data logic
//   const filterData = (query) => {
//     const filtered = rowData.filter(
//       (agent) =>
//         agent.firstName.toLowerCase().includes(query.toLowerCase()) ||
//         agent.lastName.toLowerCase().includes(query.toLowerCase()) ||
//         agent.userID?.toLowerCase().includes(query.toLowerCase()) ||
//         agent.email?.toLowerCase().includes(query.toLowerCase()) ||
//         agent.designation?.toLowerCase().includes(query.toLowerCase()) ||
//         agent.mobile?.includes(query) ||
//         agent.state?.name.toLowerCase().includes(query.toLowerCase()) ||
//         agent.city?.name.toLowerCase().includes(query.toLowerCase()),
//     );
//     setFilteredData(filtered);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const renderPagination = () => (
//     <div className="pagination-container">
//       <button
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       <span>
//         Page {currentPage} of {totalPages}
//       </span>
//       <button
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );

//   return (
//     <>
//       <div className="form-wrapper-agent">
//         <CommonHeader title="Agents" />
//         <div className="modify-agent-container">
//           <div className="top-actions">
//             <div className="search-container">
//               <input
//                 type="text"
//                 className="search-input"
//                 placeholder="Enter agent name or user ID to search..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearchInputChange(e.target.value)}
//               />
//               <button
//                 className="search-button-download"
//                 onClick={handleSearchButtonClick}
//               >
//                 Search
//               </button>
//             </div>
//             <button className="create-agent-button" onClick={handleCreateAgent}>
//               Create Agent &nbsp; <i className="fas fas fa-arrow-right"></i>
//             </button>
//           </div>
//           <div className="ag-theme-alpine ag-grid-container">
//             <AgGridReact rowData={filteredData} columnDefs={columnDefs} />
//           </div>
//           {renderPagination()}
//         </div>
//       </div>

//       {isPopupOpen && (
//         <EditAgent agentData={selectedAgent} onClose={handleClosePopup} />
//       )}
//     </>
//   );
// };

// export default ModifyAgent;



import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./AgentModify.scss";
import { FaEdit, FaBell, FaBan } from "react-icons/fa";
import CommonHeader from "../CommonHeader/CommonHeader";
import EditAgent from "../EditAgent/EditAgent";
import { getAllAgent } from "./Services/Methods";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";
import _ from "lodash"; // Import lodash for debouncing

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
        `${changeToCapitalize(params.data.firstName) || "NA"} ${changeToCapitalize(params.data.lastName) || "NA"
        }`,
      sortable: true,
      filter: true,
    },
    {
      headerName: "User Name",
      field: "userID",
      valueGetter: (params) => params.data.userName || "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Agent Email ID",
      field: "email",
      valueGetter: (params) => params.data.email || "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Mobile No.",
      field: "mobile",
      valueGetter: (params) => params.data.mobile || "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Designation",
      field: "designation",
      valueGetter: (params) =>
        changeToCapitalize(params.data.designation) || "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Region",
      valueGetter: (params) => params.data.region?.name || "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "State",
      valueGetter: (params) => params.data.state?.name || "NA",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      valueGetter: (params) => params.data.city?.name || "NA",
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

  const getAllAgentData = async (page, query = "") => {
    try {
      const formData = {
        page: page,
        limit: 10,
        searchQuery: query,
        role: 3,
      };
      const result = await getAllAgent(formData);
      if (result.response.responseCode === 1) {
        setRowData(result.response.responseData.agents);
        setFilteredData(result.response.responseData.agents); // Update filteredData on initial load
        setTotalPages(result.response.responseData.totalPages);
      } else {
        setRowData([]);
        setFilteredData([]); // Update filteredData on error
        console.error(result.response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllAgentData(currentPage);
  }, [currentPage]);

  // Debounce logic for API call
  const debounceSearch = useCallback(
    _.debounce((query) => {
      if (query.length >= 4) {
        getAllAgentData(1, query); // Fetch data from API for search query
      } else {
        getAllAgentData(1); // Fetch all data when query is empty or less than 4 characters
      }
    }, 500),
    [] // Dependencies
  );

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
    debounceSearch(query);
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

  const handleAdminFilterChange = (admin) => {
    if (admin) {
      const filtered = rowData.filter((agent) => agent.role === admin);
      setFilteredData(filtered);
    } else {
      // Reset to original data if no admin is selected
      setFilteredData(rowData);
    }
  };

  const handleSuperAdminFilterChange = (superadmin) => {
    if (superadmin) {
      const filtered = rowData.filter((agent) => agent.role === superadmin);
      setFilteredData(filtered);
    } else {
      // Reset to original data if no superadmin is selected
      setFilteredData(rowData);
    }
  };


  return (
    <>
      <div className="form-wrapper-agent">
        <CommonHeader title="Agents" />
        <div className="modify-agent-container">
          <div className="top-actions">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter at least 4 characters to search..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
              />
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

