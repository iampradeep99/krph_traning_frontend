import React, { useEffect, useState } from "react";
import "./CreateNewAgent.scss";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../CommonHeader/CommonHeader";
import { getAdmins, getAllRegion, getById, getCreateAgent,getQualification } from "./Services/Methods";
import { getSessionStorage } from "../../Login/Auth/auth";
import { AlertMessage } from "../../../Framework/Components/Widgets/Notification/NotificationProvider";
import { jwtDecode } from "jwt-decode";
import  Loader  from "./Loader/Loader";
import { useLocation } from "react-router-dom";

const CreateNewAgent = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // Get the value of 'userId'
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();
  const token = getSessionStorage("token");
  const decodetoken = jwtDecode(token);
  
  const UserRefID = decodetoken.userId;
  const [isLoadingCreateAgent, setLoadingCreateAgent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    designation: "",
    role: 3,
    region: "",
    state: "",
    city: "",
    gender: 6,
    dob: "",
    qualification: "",
    experience: 0,
    location: "",
    refId: UserRefID,
    admin: "", // Add admin field to the state
    supervisor: "" // Add supervisor field to the state
  });

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      designation: "",
      region: "",
      state: "",
      city: "",
      gender: 6,
      dob: "",
      qualification: "",
      experience: 0,
      location: "",
      refId: UserRefID,
      role: 3,
      admin: "", // Add admin field to the state
      supervisor: "" // Add supervisor field to the state
    });
  };

  const [regions, setRegions] = useState([]);
  const [qualification, setqualification] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
    const [selectedSupervisor, setSelectedSupervisor] = useState("");


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (/\d/.test(formData.firstName)) {
      newErrors.firstName = "Numbers are not allowed in First Name";
    } else if (/[^A-Za-z]/.test(formData.firstName)) {
      newErrors.firstName = "Special characters are not allowed";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (/\d/.test(formData.lastName)) {
      newErrors.lastName = "Numbers are not allowed in Last Name";
    } else if (/[^A-Za-z]/.test(formData.lastName)) {
      newErrors.lastName = "Special characters are not allowed";
    }


    if (formData.gender === 6) {
      newErrors.gender = "Please select a valid gender";
    }
    


    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Valid Email is required";
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Valid 10-digit Mobile Number is required";
    }
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    } else if (!/^\d{1,2}$/.test(formData.experience)) {
      newErrors.experience = "Experience must be a 1 or 2-digit number";
    } else if (parseInt(formData.experience, 10) < 1 || parseInt(formData.experience, 10) > 99) {
      newErrors.experience = "Experience must be between 1 and 99";
    }
    return newErrors;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "experience" || name === "mobile"
        ? value.replace(/\D/g, "")
        : name === "gender"
          ? parseInt(value, 10)
          : value,
    }));
    if (name === "admin" && value !== "") {
      fetchSupervisorsByAdmin(value);  // Fetch Supervisors based on the selected Admin
    }
  };

  const fetchSupervisorsByAdmin = async (adminId) => {
    const payload = {
      page: "",
      limit: 1000000,
      searchQuery: "",
      role: 2, 
      adminId,  
    };
  
    try {
      const result = await getAdmins(payload);
  
      if (result.response.responseCode === 1 && Array.isArray(result.response.responseData.agents)) {
        setAllSupervisors(result.response.responseData.agents);
      } else {
        console.error("Error fetching supervisors:", result.response.responseMessage || "Unexpected response format");
        setAllSupervisors([]);
      }
    } catch (error) {
      console.error("Error fetching supervisors:", error);
      setAlertMessage({
        type: "error",
        message: "Failed to fetch supervisors. Please try again later.",
      });
    }
  };

  const handleBack = () => {
    navigate("/agents/List");
  };

  const fetchRegions = async () => {
    const response = await getAllRegion({
      mode: "region",
      _id: "",
    });

    if (
      response.response.responseCode === 1 &&
      Array.isArray(response.response.responseData)
    ) {
      setRegions(response.response.responseData);
    } else {
      console.error(
        "Error fetching regions:",
        response.response.responseMessage,
      );
      setRegions([]);
    }
  };

  const fetchAdmin = async() =>{
    const payload = {
      page: '',
      limit: 1000000,
      searchQuery: '',
      role: 1,
    }
    const result = await getAdmins(payload)
    console.log(result, "testing result")
    if(result.response.responseCode == 1 && Array.isArray(result.response.responseData.agents)){
      setAdmin(result.response.responseData.agents);

    }else{
      console.error(
        "Error fetching admins:",
        result.response.responseMessage,
      );
      setAdmin([]);
    }
  }

  const fetchSupervisors = async () => {
    const payload = {
      page: '',
      limit: 1000000,
      searchQuery: '',
      role: 2, // Assuming role 2 represents supervisors
    };
  
    try {
      const result = await getAdmins(payload);
  
      if (result.response.responseCode === 1 && Array.isArray(result.response.responseData.agents)) {
        setAllSupervisors(result.response.responseData.agents);
      } else {
        console.error(
          "Error fetching supervisors:",
          result.response.responseMessage || "Unexpected response format"
        );
        setAllSupervisors([]);
      }
    } catch (error) {
      console.error("Error fetching supervisors:", error);
      setAlertMessage({
        type: "error",
        message: "Failed to fetch supervisors. Please try again later.",
      });
    }
  };
  const fetchQualification = async () => {
    const response = await getQualification({

    });

    if (
      response.response.responseCode === 1 &&
      Array.isArray(response.response.responseData)
    ) {
      setqualification(response.response.responseData);
    } else {
      console.error(
        "Error fetching qualification:",
        response.response.responseMessage,
      );
      setqualification([]);
    }
  };

  useEffect(() => {
    debugger;
    if (formData.region) {
      const fetchStates = async () => {
        debugger;
        const selectedRegion = regions.find(
          (region) => region._id === formData.region,
        );
        if (selectedRegion) {
          const response = await getAllRegion({
            mode: "state",
            _id: selectedRegion._id,
          });

          if (
            response.response.responseCode === 1 &&
            Array.isArray(response.response.responseData)
          ) {
            setStates(response.response.responseData);
          } else {
            console.error(
              "Error fetching states:",
              response.response.responseMessage,
            );
            setStates([]);
          }
        }
      };

      fetchStates();
      setFormData((prevData) => ({ ...prevData, state: "", city: "" }));
    }
  }, [formData.region, regions]);

  useEffect(() => {
    debugger;
    if (formData.state) {
      const fetchCities = async () => {
        debugger;
        const selectedState = states.find(
          (state) => state._id === formData.state,
        );
        if (selectedState) {
          const response = await getAllRegion({
            mode: "city",
            _id: selectedState._id,
          });

          if (
            response.response.responseCode === 1 &&
            Array.isArray(response.response.responseData)
          ) {
            setCities(response.response.responseData);
          } else {
            console.error(
              "Error fetching cities:",
              response.response.responseMessage,
            );
            setCities([]);
          }
        }
      };

      fetchCities();
      setFormData((prevData) => ({ ...prevData, city: "" }));
    }
  }, [formData.state, states]);

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoadingCreateAgent(true);

    try {
    
      const response = await getCreateAgent(formData);
     
      if (response?.response?.responseCode === 1) {
        setAlertMessage({
          type: "success",
          message: response.response.responseMessage,
         
        });
        navigate('/agents/list')
      } else {
        setAlertMessage({
          type: "error",
          message: response.response.responseMessage,
        });
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
    finally {
      setLoadingCreateAgent(false); 
    }
  };

  const getUserById = async (userId) => {
    try {
      const payload = {
        userId: userId,
      };
      const response = await getById(payload);
      if (response.response.responseCode === 1) {
        const user = response.response.responseData[0];
        setFormData((prevData) => ({
          ...prevData,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          designation: user.designation,
          region: user.country._id,
          state: user.state._id,
          city: user.city?._id,
          gender: user.gender !== undefined ? user.gender : 6,
          dob: user.dob ? formatDate(user.dob) : "",
          qualification: user.qualification,
          experience: user.experience,
          location: user.location,
          admin: user.adminId,
          supervisor: user.supervisorId,
        }));
      } else {
        console.log("Error fetching user by id");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1; // Months are zero-indexed
    const day = d.getDate();
    const year = d.getFullYear();
  
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };
  

  useEffect(() => {
    fetchRegions();
    fetchQualification();
    fetchAdmin()
    fetchSupervisors()
    getUserById(userId)
  }, []);

  return (
    <>
      <div className="form-wrapper">
        <CommonHeader
          title="Create New Agent"
          subtitle="Manage agents by filling out the details below"
          buttons={[
            {
              label: "Upload Excel Sheet",
              onClick: () => console.log("Upload clicked!"),
              type: "upload",
            },
            {
              label: "Download Sample",
              onClick: () => console.log("Download clicked!"),
              type: "download",
            },
          ]}
        />
         {isLoadingCreateAgent && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}

        <div className="container">
          <span className="spanClass">
            {" "}
            {/* <button classNames="back-btn" onClick={handleBack}>
              <i className="fas fas fa-arrow-left"></i> Back
            </button> */}
          </span>
          <form className={`agent-form ${isLoadingCreateAgent ? "form-disabled" : ""}`}
        onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">First Name *</label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  pattern="[A-Za-z]*"
                  title="First Name should contain only letters"
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="last-name">Last Name *</label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  pattern="[A-Za-z]*"
                  title="Last Name should contain only letters"
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value={6}>Choose Gender</option>
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                  <option value={2}>Other</option>
                </select>
                {errors.gender && <p className="error-text">{errors.gender}</p>}
              </div>
            </div>

            <div className="form-row">
            <div className="form-group">
  <label htmlFor="email">Agent Email Id *</label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Enter Email-Id"
    value={formData.email}
    onChange={handleChange}
    disabled={userId ? true : false} // Disable if userId is present
  />
  {errors.email && <p className="error-text">{errors.email}</p>}
</div>
              <div className="form-group">
                <label htmlFor="DOB">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p className="error-text">{errors.dob}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={userId ? true : false} 
                />
                {errors.mobile && <p className="error-text">{errors.mobile}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Qualification">Qualification *</label>
                <select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                >
                  <option value="">Choose Qualification</option>
                  {qualification.map((qualification) => (
                    <option key={qualification._id} value={qualification._id}>
                      {qualification.name}
                    </option>
                  ))}
                </select>
                {errors.qualification && <p className="error-text">{errors.qualification}</p>}
              </div>
              {/* <div className="form-group">
                <label htmlFor="Experience">Experience </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="Enter Experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
                {errors.experience && (
                  <p className="error-text">{errors.experience}</p>
                )}
              </div> */}
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  placeholder="Enter Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onInput={(e) => {

                    if (e.target.value.length > 2) {
                      e.target.value = e.target.value.slice(0, 2);
                    }
                  }}
                />
                {errors.experience && (
                  <p className="error-text">{errors.experience}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="designation">Designation *</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder="Enter Designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
                {errors.designation && (
                  <p className="error-text">{errors.designation}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="region">Region *</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                >
                  <option value="">Choose Region</option>
                  {regions.map((region) => (
                    <option key={region._id} value={region._id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {errors.region && <p className="error-text">{errors.region}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Choose State</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="error-text">{errors.state}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Choose City</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="error-text">{errors.city}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && (
                  <p className="error-text">{errors.location}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="Qualification">Admins *</label>
                <select
                  id="admoin"
                  name="admin"
                  value={formData.admin}
                  onChange={handleChange}
                >
                  <option value="">Choose Admin</option>
                  {admin.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {`${ele.firstName} ${ele.lastName}`}
                    </option>
                  ))}
                </select>
                {errors.qualification && <p className="error-text">{errors.qualification}</p>}
              </div>
             
              <div className="form-group">
                <label htmlFor="Qualification">Supervisors *</label>
                <select
                  id="supervisor"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleChange}
                >
                  <option value="">Choose Supervisor</option>
                  {allSupervisors.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {`${ele.firstName} ${ele.lastName}`}
                    </option>
                  ))}
                </select>
                {errors.supervisor && <p className="error-text">{errors.supervisor}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group"></div>{" "}
              <div className="form-group"></div>
            </div>

            <div className="form-actions">
  <button type="submit" className="submit-btn">
    {userId ? "Update Agent" : "Add Agent"}
  </button>

  <button type="button" className="reset-btn" onClick={resetForm}>
    Reset
  </button>

  <button type="button" className="reset-btn" onClick={handleBack}>
    Cancel
  </button>
</div>

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewAgent;
