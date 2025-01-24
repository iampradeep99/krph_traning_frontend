import { React, useState,useEffect } from "react";
import "./EditAgent.scss";
import {getQualification, getAllRegion} from "../CreateNewAgent/Services/Methods";
import { AlertMessage } from "../../../Framework/Components/Widgets/Notification/NotificationProvider";


const EditAgent = ({ agentData, onClose }) => {
  debugger;
    const setAlertMessage = AlertMessage();
    const showAlert = (type, message) => {
      setAlertMessage({ type, message });
    };

    const [regions, setRegions] = useState([]);
    const [qualification, setqualification] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    agentID: agentData.userName || "",
    firstName: agentData.firstName || "",
    lastName: agentData.lastName || "",
    city: agentData.city.name || "",
    state: agentData.state.name || "",
    mobile: agentData.mobile || "",
    designation: agentData.designation || "",
    region: agentData.region.name || "",
    email: agentData.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic, e.g., call setUpdateUser
    console.log("Updated form data: ", formData);
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
        showAlert("Error fetching regions:", response.response.responseMessage,);
        // console.error(
        //   "Error fetching regions:",
        //   response.response.responseMessage,
        // );
        setRegions([]);
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
        showAlert( "Error fetching qualification:", response.response.responseMessage,);
        // console.error(
        //   "Error fetching qualification:",
        //   response.response.responseMessage,
        // );
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


    useEffect(() => {
      fetchRegions();
      fetchQualification();
    }, []);


  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h4>Modify Agent Details</h4>
        <div className="container">
          <form className="agent-form"  onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">Agent ID *</label>
                <input
                  type="text"
                  id="agentID"
                  name="agentID"
                  placeholder="Enter Agent ID"
                  value={formData.agentID}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-name">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  // value={formData.gender}
                  // onChange={handleChange}
                >
                  <option value="">Choose Gender</option>
                  {/* Add state options dynamically here */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">Agent Email Id *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email-Id"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Date of Birth *</label>
                <input
                  type="date"
                  id="training-date"
                  name="DOB"
                  placeholder="22/11/2024"
                  required
                  //  value={formData.mobile}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="mobile">Qualification </label>
                <input
                  type="text"
                  id="Qualification"
                  name="Qualification"
                  placeholder="Enter Qualification"
                  value={formData.Qualification}
                  onChange={handleChange}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="Qualification">Qualification *</label>
                <select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                >
                  <option value="">{formData.qualification}</option>
                  {qualification.map((qualification) => (
                    <option key={qualification._id} value={qualification._id}>
                      {qualification.name}
                    </option>
                  ))}
                </select>
                {errors.qualification && <p className="error-text">{errors.qualification}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Experience </label>
                <input
                  type="text"
                  id="Experience"
                  name="Experience"
                  placeholder="Enter Experience"
                  // value={formData.mobile}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
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
              </div>
              <div className="form-group">
                <label htmlFor="designation">Location *</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder="Enter Location"
                  // value={formData.designation}
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">Region *</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                >
                  <option value=''>{formData.region}</option>
                  {/* Add state options dynamically here */}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">{formData.state}</option>
                  {/* Add state options dynamically here */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">{formData.city}</option>
                  {/* Add city options dynamically here */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="city">Type *</label>
                <select
                  id="city"
                  name="city"
                  // value={formData.city}
                  // onChange={handleChange}
                >
                  <option value="">Choose Type</option>
                  {/* Add city options dynamically here */}
                </select>
              </div>
            </div>
            {/* <div className="form-group">
                        <label>Type of Privilege *</label>
                        <div className="privilege-options">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="privilege"
                                    value="admin"
                                    checked={formData.privilege === 'admin'}
                                    onChange={handleRadioChange}
                                />
                                <span className="radio-custom"></span> Admin
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="privilege"
                                    value="agent"
                                    checked={formData.privilege === 'agent'}
                                    onChange={handleRadioChange}
                                />
                                <span className="radio-custom"></span> Agent
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="privilege"
                                    value="trainer"
                                    checked={formData.privilege === 'trainer'}
                                    onChange={handleRadioChange}
                                />
                                <span className="radio-custom"></span> Trainer
                            </label>
                        </div>
                    </div> */}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Agent Status *</label>
                <select
                  id="city"
                  name="city"
                  // value={formData.city}
                  // onChange={handleChange}
                >
                  <option value="">Choose Status</option>
                  {/* Add city options dynamically here */}
                </select>
              </div>
              <div className="form-group"></div>{" "}
              <div className="form-group"></div>
              {/* <div className="form-group">
                            <label htmlFor="username">User Name *</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter User Name"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Create Password *</label>
                            <div className="password-group">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password / Generate"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button type="button" className="generate-btn">Generate</button>
                            </div>
                        </div> */}
            </div>
            <div className="form-actions">
              <button type="button" onClick={onClose} className="cancel-button">
                Cancel
              </button>

              <button type="submit" className="submit-btn">
                Modify Agent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;
