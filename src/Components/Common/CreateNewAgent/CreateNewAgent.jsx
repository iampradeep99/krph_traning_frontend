import React, { useEffect, useState } from "react";
import "./CreateNewAgent.scss";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../CommonHeader/CommonHeader";
import { getAllRegion, getCreateAgent,getQualification } from "./Services/Methods";
import { getSessionStorage } from "../../Login/Auth/auth";
import { AlertMessage } from "../../../Framework/Components/Widgets/Notification/NotificationProvider";
import { jwtDecode } from "jwt-decode";

const CreateNewAgent = () => {
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();
  const token = getSessionStorage("token");
  const decodetoken = jwtDecode(token);
  const UserRefID = decodetoken.userId;
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
    });
  };

  const [regions, setRegions] = useState([]);
  const [qualification , setqualification] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
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
    // if (!formData.experience) newErrors.experience = "Experience is required";
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "gender" && value !== "" ? parseInt(value, 10) : value,
//     }));
//   };

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

    try {
      const response = await getCreateAgent(formData);

      if (response?.response?.responseCode === 1) {
        setAlertMessage({
          type: "success",
          message: response.response.responseMessage,
        });
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
  };

  useEffect(() => {
    fetchRegions();
    fetchQualification();
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

        <div className="container">
          <span className="spanClass">
            {" "}
            <button classNames="back-btn" onClick={handleBack}>
              <i className="fas fas fa-arrow-left"></i> Back
            </button>
          </span>
          <form className="agent-form" onSubmit={handleSubmit}>
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
                />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName}</p>
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
                />
                {errors.lastName && (
                  <p className="error-text">{errors.lastName}</p>
                )}
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
                {/* <label htmlFor="city">Agent Status *</label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Choose Status</option>
                              
                            </select>
                            {errors.city && <p className="error-text">{errors.city}</p>} */}
              </div>
              <div className="form-group"></div>
            </div>

            <div className="form-row">
              <div className="form-group"></div>{" "}
              <div className="form-group"></div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Create New Agent
              </button>
              <button type="button" className="reset-btn" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewAgent;
