import React, { useState, useEffect } from "react";
import "./CreateNewAdmin.scss";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../CommonHeader/CommonHeader";
import svgImage from "../SideBar/Assets/raster-img-overlay.svg";
import { addAdmins, getRegionStateCity } from "./Services/Methods";
import { AlertMessage } from "../../../Framework/Components/Widgets/Notification/NotificationProvider";

const CreateNewAdmin = () => {
  const setAlertMessage = AlertMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    designation: "",
    region: "",
    state: "",
    city: "",
    role: 1,
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    designation: "",
    region: "",
    state: "",
    city: "",
  });

  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoadingCreateAdmin, setisLoadingCreateAdmin] = useState(false);
  isLoadingCreateAdmin
  const fetchRegions = async () => {
    try {
      const formData = { mode: "region" };
      const response = await getRegionStateCity(formData);
      if (response && response.response.responseCode === 1) {
        setRegions(response.response.responseData);
      } else {
        setRegions([]);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const fetchStates = async (regionId) => {
    try {
      const formData = { mode: "state", _id: regionId };
      const response = await getRegionStateCity(formData);
      if (response && response.response.responseCode === 1) {
        setStates(response.response.responseData);
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const formData = { mode: "city", _id: stateId };
      const response = await getRegionStateCity(formData);
      if (response && response.response.responseCode === 1) {
        setCities(response.response.responseData);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  useEffect(() => {
    fetchRegions();
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setFormData({
      ...formData,
      region: regionId, // Update the region field
      state: "", // Reset state
      city: "", // Reset city
    });
    fetchStates(regionId);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFormData({
      ...formData,
      state: stateId, // Update the state field
      city: "", // Reset city
    });
    fetchCities(stateId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({
      ...formData,
      city: cityId, // Update the city field
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return;
      }
    }
    if (name === "mobile") {
      const regex = /^[0-9]+$/;
      if (!regex.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      privilege: e.target.value,
    });
  };

  const handelBack = () => {
    navigate("/admins");
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName =
        "First name should contain only letters and spaces.";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last name should contain only letters and spaces.";
      isValid = false;
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
      isValid = false;
    }

    if (!formData.designation) {
      newErrors.designation = "Designation is required.";
      isValid = false;
    }

    if (!formData.region) {
      newErrors.region = "Region is required.";
      isValid = false;
    }

    if (!formData.state) {
      newErrors.state = "State is required.";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "City is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      delete formData.designation;
      delete formData.username;
      delete formData.password;
      setisLoadingCreateAdmin(true);
      try{
        const data = await addAdmins(formData)
        if(data?.response.responseCode == "1"){
            setAlertMessage({
              message: data.response.responseMessage,
              type: "success",
            });
            navigate("/admins");

        }else{

            setAlertMessage({
              message: data.response.responseMessage,
              type: "error",
            });
            return;
         

        }

      }catch(err){
        console.log(err, "err")
        setAlertMessage({
          message: "Error creating new admin",
          type: "error",
        });
        return;
      }finally{
        setisLoadingCreateAdmin(false);
      }

    }
  };

  const handleUploadClick = () => {
    console.log("Upload clicked!");
  };

  const handleDownloadClick = () => {
    console.log("Download clicked!");
  };

  return (
    <>
      <div className="form-wrapper">
        <CommonHeader
          title="Create New Admin"
          subtitle="Manage agents by filling out the details below"
          buttons={[
            {
              label: "Upload Excel Sheet",
              onClick: handleUploadClick,
              type: "upload",
            },
            {
              label: "Download Sample",
              onClick: handleDownloadClick,
              type: "download",
            },
          ]}
        />
           {isLoadingCreateAdmin && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
        <div className="container">
          <form className={`agent-form ${isLoadingCreateAdmin ? "form-disabled" : ""}`}
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
                  className={errors.firstName ? "error-input" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
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
                  className={errors.lastName ? "error-input" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
              <div className="form-group">
            
              </div>
            </div>
            

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>
                </select>
              </div>

              <div className="form-group">
    <label htmlFor="email">Email *</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Enter Email Address"
      value={formData.email}
      onChange={handleChange}
      className={errors.email ? "error-input" : ""}
    />
    {errors.email && (
      <span className="error-message">{errors.email}</span>
    )}
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
                  className={errors.mobile ? "error-input" : ""}
                />
                {errors.mobile && (
                  <span className="error-message">{errors.mobile}</span>
                )}
              </div>
            </div>

            

            <div className="form-row">
            <div className="form-group">
    <label htmlFor="dob">Date of Birth *</label>
    <input
      type="date"
      id="dob"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className={errors.dob ? "error-input" : ""}
    />
    {errors.dob && (
      <span className="error-message">{errors.dob}</span>
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
                  className={errors.designation ? "error-input" : ""}
                />
                {errors.designation && (
                  <span className="error-message">{errors.designation}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
             
            </div>

            <div className="form-row">
            <div className="form-group">
                <label htmlFor="region">Region *</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region} // Bind to formData.region
                  onChange={handleRegionChange}
                  className={errors.region ? "error-input" : ""}
                >
                  <option value="">Choose Region</option>
                  {regions.map((region) => (
                    <option key={region._id} value={region._id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <span className="error-message">{errors.region}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state} // Bind to formData.state
                  onChange={handleStateChange}
                  className={errors.state ? "error-input" : ""}
                >
                  <option value="">Choose State</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <span className="error-message">{errors.state}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city} // Bind to formData.city
                  onChange={handleCityChange}
                  className={errors.city ? "error-input" : ""}
                >
                  <option value="">Choose City</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>
            </div>
          </form>

          <div className="button-container">
            <button type="submit" onClick={handleSubmit} className="submit-btn">
              Add Admin
            </button>
            <button onClick={handelBack} className="back-btn">
               Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewAdmin;
