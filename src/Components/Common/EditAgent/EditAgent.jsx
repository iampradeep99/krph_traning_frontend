import {React, useState} from "react";
import "./EditAgent.scss";

const EditAgent = ({ agentData, onClose }) => {
    const[formData , setformData] = useState();
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h4>Modify Agent Details</h4>
        <div className="container">
                <form className="agent-form" >
                    <div className="form-row">
                    <div className="form-group">
                            <label htmlFor="first-name">Agent ID *</label>
                            <input
                                type="text"
                                id="first-name"
                                name="Agent ID"
                                placeholder="Enter Agent ID"
                                // value={formData.firstName}
                                // onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="first-name">First Name *</label>
                            <input
                                type="text"
                                id="first-name"
                                name="firstName"
                                placeholder="Enter First Name"
                                // value={formData.firstName}
                                // onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last Name *</label>
                            <input
                                type="text"
                                id="last-name"
                                name="lastName"
                                placeholder="Enter Last Name"
                                // value={formData.lastName}
                                // onChange={handleChange}
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
                                // value={formData.email}
                                // onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Date of Birth *</label>
                            <input type="date" id="training-date" name="DOB" placeholder="22/11/2024" required  
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
                                // value={formData.mobile}
                                // onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Qualification </label>
                            <input
                                type="text"
                                id="Qualification"
                                name="Qualification"
                                placeholder="Enter Qualification"
                                // value={formData.mobile}
                                // onChange={handleChange}
                            />
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
                                // value={formData.designation}
                                // onChange={handleChange}
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
                                id="state"
                                name="state"
                                // value={formData.state}
                                // onChange={handleChange}
                            >
                                <option value="">Choose Region</option>
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
                                // value={formData.state}
                                // onChange={handleChange}
                            >
                                <option value="">Choose state</option>
                                {/* Add state options dynamically here */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <select
                                id="city"
                                name="city"
                                // value={formData.city}
                                // onChange={handleChange}
                            >
                                <option value="">Choose city</option>
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
                        <div className="form-group"></div> <div className="form-group"></div>

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
        
            <button type="submit" className="submit-btn">Modify Agent</button></div>
                   
                </form>
            </div>
      </div>
     
           
          
    </div>
  );
};

export default EditAgent;
