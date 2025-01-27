// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise/dist/styles/ag-grid.css";
// import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
// import "./SupervisorList.scss";
// import { FaEdit, FaBan } from "react-icons/fa";
// import CommonHeader from "../CommonHeader/CommonHeader";
// import EditAgent from "../EditAgent/EditAgent";
// import { getAllAgent } from "./Services/Methods";
// import { changeToCapitalize } from "../../../Service/Utilities/Utils";
// import debounce from "lodash.debounce";

// const SupervisorList = () => {
//   const navigate = useNavigate();
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [rowData, setRowData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit] = useState(10);
//   const [selectedAdmin, setSelectedAdmin] = useState(""); // Added state for selected admin
//   const [adminList, setAdminList] = useState([]); // State for admin list

//   const [columnDefs] = useState([
//     {
//       headerName: "Action",
//       field: "action",
//       width: 100,
//       cellRendererFramework: (params) => (
//         <div className="action-icons">
//           <FaEdit className="icon edit-icon" title="Edit" onClick={() => handleEdit(params.data)} />
//           <FaBan className="icon disable-icon" title="Disable" />
//         </div>
//       ),
//     },
//     {
//       headerName: "Supervisor Name",
//       field: "fullName",
//       valueGetter: (params) =>
//         `${changeToCapitalize(params.data.firstName)} ${changeToCapitalize(params.data.lastName)}`,
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Supervisor Email ID",
//       field: "email",
//       valueGetter: (params) => params.data.email || "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Mobile No.",
//       field: "mobile",
//       valueGetter: (params) => params.data.mobile || "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Designation",
//       field: "designation",
//       valueGetter: (params) =>
//         params.data.role === 2 ? "Supervisor" : changeToCapitalize(params.data.designation) || "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Region",
//       valueGetter: (params) => params.data.region?.name || "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "State",
//       valueGetter: (params) => params.data.state?.name || "NA",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "City",
//       valueGetter: (params) => params.data.city?.name || "NA",
//       sortable: true,
//       filter: true,
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
//     navigate("/addSupervisor");
//   };

//   const handleAdminChange = (e) => {
//     setSelectedAdmin(e.target.value);
//   };

//   const handleFilterApply = () => {
//     getAllAgentData(1, searchQuery, selectedAdmin);
//   };

//   const getAllAgentData = async (page, searchQuery, adminId = "") => {
//     try {
//       const formData = {
//         page,
//         limit: 10,
//         searchQuery,
//         role: 2, // Filtering only supervisors
//         adminId, // Pass the selected admin ID here
//       };

//       const result = await getAllAgent(formData);

//       if (result.response.responseCode === 1) {
//         const agents = result.response.responseData.agents;
//         setRowData(agents);
//         setFilteredData(agents);
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

//   const debouncedSearch = useCallback(
//     debounce((query) => {
//       if (query.length >= 4) {
//         getAllAgentData(1, query, selectedAdmin);
//       }
//     }, 300),
//     [selectedAdmin] // Include selectedAdmin in the dependency array to ensure it updates when selected
//   );

//   useEffect(() => {
//     getAllAgentData(currentPage, "", selectedAdmin);
//   }, [currentPage, selectedAdmin]);

//   useEffect(() => {
//     // Get the list of admins when the component mounts
//     const fetchAdmins = async () => {
//       try {
//         const result = await getAllAgent({ role: 1 }); 
//         if (result.response.responseCode === 1) {
//           setAdminList(result.response.responseData.agents);
//         } else {
//           console.error(result.response.responseMessage);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   const handleSearchInputChange = (query) => {
//     setSearchQuery(query);
//     if (query === "") {
//       getAllAgentData(1, "", selectedAdmin);
//     } else {
//       debouncedSearch(query);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const renderPagination = () => (
//     <div className="pagination-container">
//       <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//         <i className="fas fas fa-arrow-left"></i>
//       </button>
//       <span>
//         Page {currentPage} of {totalPages}
//       </span>
//       <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//         <i className="fas fas fa-arrow-right"></i>
//       </button>
//     </div>
//   );

//   return (
//     <>
//       <div className="form-wrapper-agent">
//         <CommonHeader title="Supervisor" />
//         <div className="modify-agent-container">
//           <div className="top-actions">
//             <div className="search-container">
//               <input
//                 type="text"
//                 className="search-input"
//                 placeholder="Enter admin name or user ID to search..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearchInputChange(e.target.value)}
//               />
//               <button className="search-button-download" onClick={() => debouncedSearch(searchQuery)}>
//                 Search
//               </button>
//             </div>
//             <div className="role-filters">
//               <div className="admin-filter">
//                 <select
//                   id="admin-filter"
//                   className="role-dropdown"
//                   value={selectedAdmin}
//                   onChange={handleAdminChange}
//                 >
//                   <option value="">Select Admin</option>
//                   {adminList?.map((ele) => (
//                     <option key={ele._id} value={ele._id}>
//                       {`${ele.firstName} ${ele.lastName}`}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <button className="create-agent-button" onClick={handleFilterApply}>
//                 Apply Filters
//               </button>
//             </div>
//             <button className="create-agent-button" onClick={handleCreateAgent}>
//               Add Supervisor
//             </button>
//           </div>
//           <div className="ag-theme-alpine ag-grid-container">
//             {filteredData?.length === 0 ? (
//               <div className="no-records-found">No records found</div>
//             ) : (
//               <AgGridReact
//                 rowData={filteredData}
//                 columnDefs={[
//                   { headerName: "S.No", valueGetter: (params) => params.node.rowIndex + 1, width: 80 },
//                   ...columnDefs,
//                 ]}
//                 defaultColDef={{ resizable: true, sortable: true }}
//                 rowHeight={30}
//                 className="ag-theme-alpine"
//               />
//             )}
//           </div>
//           {renderPagination()}
//         </div>
//       </div>

//       {isPopupOpen && <EditAgent agentData={selectedAgent} onClose={handleClosePopup} />}
//     </>
//   );
// };

// export default SupervisorList;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-alpine.css";
import "./SupervisorList.scss";
import { FaEdit, FaBan } from "react-icons/fa";
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
  const [selectedAdmin, setSelectedAdmin] = useState(""); // Added state for selected admin
  const [adminList, setAdminList] = useState([]); // State for admin list

  const [columnDefs] = useState([
    {
      headerName: "Action",
      field: "action",
      width: 100,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <FaEdit className="icon edit-icon" title="Edit" onClick={() => handleEdit(params.data)} />
          <FaBan className="icon disable-icon" title="Disable" />
        </div>
      ),
    },
    {
      headerName: "Supervisor Name",
      field: "fullName",
      valueGetter: (params) =>
        `${changeToCapitalize(params.data.firstName)} ${changeToCapitalize(params.data.lastName)}`,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Supervisor Email ID",
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
        params.data.role === 2 ? "Supervisor" : changeToCapitalize(params.data.designation) || "NA",
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

  const handleAdminChange = (e) => {
    setSelectedAdmin(e.target.value); // Update the selected admin state
  };

  const handleFilterApply = () => {
    getAllAgentData(1, searchQuery, selectedAdmin); // Fetch data based on selected admin and search query
  };

  const getAllAgentData = async (page, searchQuery, adminId = "") => {
    try {
      const formData = {
        page,
        limit: 10,
        searchQuery,
        role: 2, // Filtering only supervisors
        adminId, // Pass the selected admin ID here
      };

      const result = await getAllAgent(formData);

      if (result.response.responseCode === 1) {
        const agents = result.response.responseData.agents;
        setRowData(agents);
        setFilteredData(agents);
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
        getAllAgentData(1, query, selectedAdmin); // Trigger data fetch after debounce with both search query and selected admin
      }
    }, 300),
    [selectedAdmin] // Ensure it also depends on the selected admin
  );

  useEffect(() => {
    getAllAgentData(currentPage, "", selectedAdmin);
  }, [currentPage, selectedAdmin]);

  useEffect(() => {
    // Get the list of admins when the component mounts
    const fetchAdmins = async () => {
      try {
        const result = await getAllAgent({ role: 1 });
        if (result.response.responseCode === 1) {
          setAdminList(result.response.responseData.agents);
        } else {
          console.error(result.response.responseMessage);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdmins();
  }, []);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query); // Just update search query state
    if (query === "") {
      getAllAgentData(1, "", selectedAdmin); // Apply filters if the search query is empty
    } else {
      debouncedSearch(query); // Wait until user stops typing for the debounce
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => (
    <div className="pagination-container">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <i className="fas fas fa-arrow-left"></i>
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
              <button className="search-button-download" onClick={() => debouncedSearch(searchQuery)}>
                Search
              </button>
            </div>
            <div className="role-filters">
              <div className="admin-filter">
                <select
                  id="admin-filter"
                  className="role-dropdown"
                  value={selectedAdmin}
                  onChange={handleAdminChange}
                >
                  <option value="">Select Admin</option>
                  {adminList?.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {`${ele.firstName} ${ele.lastName}`}
                    </option>
                  ))}
                </select>
              </div>
              <button className="create-agent-button" onClick={handleFilterApply}>
                Apply Filters
              </button>
            </div>
            <button className="create-agent-button" onClick={handleCreateAgent}>
              Add Supervisor
            </button>
          </div>
          <div className="ag-theme-alpine ag-grid-container">
            {filteredData?.length === 0 ? (
              <div className="no-records-found">No records found</div>
            ) : (
              <AgGridReact
                rowData={filteredData}
                columnDefs={[{ headerName: "S.No", valueGetter: (params) => params.node.rowIndex + 1, width: 80 }, ...columnDefs]}
                defaultColDef={{ resizable: true, sortable: true }}
                rowHeight={30}
                className="ag-theme-alpine"
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

export default SupervisorList;
