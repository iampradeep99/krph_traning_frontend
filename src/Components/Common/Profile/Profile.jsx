import React, { useState, useEffect } from "react";
import "./Profile.scss";
import User_logo from "./userplaceholder.jpg";
import { getAllRegion, getById } from "../CreateNewAgent/Services/Methods";
import { getSessionStorage } from "../../Login/Auth/auth";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const token = getSessionStorage("token");
  const decodetoken = jwtDecode(token);
  const userId = decodetoken.userId;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    region: "",
    state: "",
    city: "",
    currentpassword: "",
    newpassword: "",
    reenterpassword: "",
  });

  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsImageModalOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      region: "",
      state: "",
      city: "",
      currentpassword: "",
      newpassword: "",
      reenterpassword: "",
    });
  };

  const fetchRegions = async () => {
    try {
      const response = await getAllRegion({ mode: "region", _id: "" });
      if (response.response.responseCode === 1) {
        setRegions(response.response.responseData);
      } else {
        console.error("Failed to fetch regions");
        setRegions([]);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const fetchStates = async (regionId) => {
    try {
      const response = await getAllRegion({ mode: "state", _id: regionId });
      if (response.response.responseCode === 1) {
        setStates(response.response.responseData);
      } else {
        console.error("Failed to fetch states");
        setStates([]);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await getAllRegion({ mode: "city", _id: stateId });
      if (response.response.responseCode === 1) {
        setCities(response.response.responseData);
      } else {
        console.error("Failed to fetch cities");
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await getById({ userId });
      if (response.response.responseCode === 1) {
        const user = response.response.responseData[0];
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          region: user.country._id || "",
          state: user.state._id || "",
          city: user.city._id || "",
        });

        if (user.country._id) {
          fetchStates(user.country._id);
        }
        if (user.state._id) {
          fetchCities(user.state._id);
        }
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

  useEffect(() => {
    fetchRegions();
    getUserById(decodetoken.userId);
  }, []);

  useEffect(() => {
    if (formData.region) {
      fetchStates(formData.region);
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [formData.region]);

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div
            className="profile-avatar-container"
            onClick={() => setIsImageModalOpen(true)}
          >
            <img
              src={selectedImage || User_logo}
              alt="Profile"
              className="profile-avatar"
            />
          </div>
        </div>
      </div>
      <div className="profile-form">
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
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Region</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name}
                </option>
              ))}
            </select>
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
              disabled={userId ? true : false}
            />
          </div>
          <div className="form-group">
            <button className="reset-btn" onClick={resetForm}>
              Modify Agent
            </button>
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <div className="image-upload-modal">
          <div className="modal-content">
            <h3>Upload Profile Picture</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={() => setIsImageModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
