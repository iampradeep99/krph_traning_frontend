import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "./AgentModify.scss";
import { FaEdit, FaBell, FaBan } from "react-icons/fa";
import CommonHeader from "../CommonHeader/CommonHeader";
import EditAgent from "../EditAgent/EditAgent";
import { getAllAgent, statusUpdate } from "./Services/Methods";
import { changeToCapitalize } from "../../../Service/Utilities/Utils";
import _ from "lodash"; 

const ModifyAgent = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [supervisorList, setSupervisorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const [columnDefs] = useState([
    {
      headerName: "Agent Name",
      field: "fullName",
      valueGetter: (params) =>
        `${changeToCapitalize(params.data.firstName) || "NA"} ${
          changeToCapitalize(params.data.lastName) || "NA"
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
      valueGetter: (params) => {
        if (params.data.role === 3) {
          return "Agent";
        }
        return changeToCapitalize(params.data.designation) || "NA";
      },
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
      headerName: "Status",
      valueGetter: (params) => params?.data?.status || "NA", 
      sortable: true,
      filter: true,
      cellRendererFramework: (params) => {
        const status = params?.data?.status;

        let circleColor = "gray"; 
        let statusText = "NA"; 

        if (status == 0) {
          circleColor = "green"; 
          statusText = "Enabled";
        } else if (status == 1) {
          circleColor = "red"; 
          statusText = "Disabled";
        }

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: circleColor,
              }}
            ></div>
            <span>{statusText}</span>
          </div>
        );
      },
    },
    {
      headerName: "Action",
      field: "action",
      cellRendererFramework: (params) => {
        const agent = params.data;
        const status = agent.status;
  
        // Handle Enable/Disable action
        const handleStatusToggle = () => {
          toggleAgentStatus(agent._id, status); // Use the function defined in the component
        };
  
        return (
          <div className="action-icons">
            <FaEdit
              className="icon edit-icon"
              title="Edit"
              onClick={() => handleEdit(agent)}
            />
            <FaBell className="icon notify-icon" title="Notify" />
            
            {/* Enable/Disable button */}
            <FaBan
              className={`icon disable-icon ${status === 0 ? "enabled" : "disabled"}`}
              title={status === 0 ? "Disable" : "Enable"}
              onClick={handleStatusToggle}
            />
          </div>
        );
      },
    },
    
  ]);

  const handleFilterApply = async (adminId, supervisorId) => {
    try {
      const formData = {
        page: 1,  
        limit: 10, 
        adminId: adminId,
        supervisorId: supervisorId,
        role:3
      };
  
      const result = await getAllAgent(formData); 
      if (result.response.responseCode === 1) {
        setFilteredData(result.response.responseData.agents);
        setTotalPages(result.response.responseData.totalPages); 
      } else {
        setFilteredData([]);
        console.error(result.response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

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

  const getAllAdmins = async () => {
    try {
      const formData = {
        page: 1,
        limit: 10000000,
        searchQuery: "",
        role: 1,
      };
      const result = await getAllAgent(formData);
      if (result.response.responseCode === 1) {
        setAdminList(result.response.responseData.agents);
      } else {
        setAdminList([]);
        console.error(result.response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSupervisorsByAdmin = async (adminId) => {
    try {
      const result = await getAllAgent({
        page: 1,
        limit: 100000,
        searchQuery: "",
        role: 2,
        adminId: adminId,
      });
      if (result.response.responseCode === 1) {
        setSupervisorList(result.response.responseData.agents);
      } else {
        setSupervisorList([]);
        console.error(result.response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
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
        setFilteredData(result.response.responseData.agents);
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
    getAllAgentData(currentPage);
    getAllAdmins();
  }, [currentPage]);

  const debounceSearch = useCallback(
    _.debounce((query) => {
      if (query.length >= 4) {
        getAllAgentData(1, query);
      } else {
        getAllAgentData(1);
      }
    }, 500),
    []
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

  const handleAdminFilterChange = (adminId) => {
    if (adminId) {
      getSupervisorsByAdmin(adminId);
    } else {
      setSupervisorList([]);
      setSelectedSupervisor("");
    }
  };

  const toggleAgentStatus = async (agentId, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
  
      const result = await statusUpdate({ agentId, status: newStatus });
  
      if (result.success) {
        setFilteredData((prevData) =>
          prevData.map((agent) =>
            agent._id === agentId ? { ...agent, status: newStatus } : agent
          )
        );
      } else {
        console.error('Failed to update agent status');
      }
    } catch (error) {
      console.error('Error updating agent status:', error);
    }
  };

  const handleAdminChange = (e) => {
    const adminId = e.target.value;
    setSelectedAdmin(adminId);
    handleAdminFilterChange(adminId);
  };

  const handleSupervisorChange = (e) => {
    setSelectedSupervisor(e.target.value);
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

            <div className="role-filters">
              <div className="admin-filter">
                <select
                  id="admin-filter"
                  className="role-dropdown"
                  value={selectedAdmin}
                  onChange={handleAdminChange}
                >
                  <option value="">--Select Admin--</option>
                  {adminList?.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {`${ele.firstName} ${ele.lastName}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="supervisor-filter">
                <select
                  id="supervisor-filter"
                  className="role-dropdown"
                  value={selectedSupervisor}
                  onChange={handleSupervisorChange}
                >
                  <option value="">--Select Supervisor--</option>
                  {supervisorList?.map((supervisor) => (
                    <option key={supervisor._id} value={supervisor._id}>
                      {`${supervisor.firstName} ${supervisor.lastName}`}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="create-agent-button"
                onClick={() => handleFilterApply(selectedAdmin, selectedSupervisor)}
              >
                Apply Filters &nbsp; <i className="fas fas fa-arrow-right"></i>
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
