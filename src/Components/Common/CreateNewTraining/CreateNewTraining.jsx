import React from "react";
import "./CreateNewTraining.scss";
import CommonHeader from "../CommonHeader/CommonHeader";
import { FaPaperPlane } from "react-icons/fa";

const CreateNewTraining = () => {
  return (
    <>
      <div className="form-wrapper">
        <CommonHeader title="Create Training Calendar" subtitle="" />
        <div className="form-container">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="agent-name">Agent name *</label>
                <input
                  type="text"
                  id="agent-name"
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="agent-email">Agent email ID *</label>
                <input
                  type="email"
                  id="agent-email"
                  placeholder="Enter agent email ID"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="training-language">Training language *</label>
                <select id="training-language" required>
                  <option value="" disabled selected>
                    Choose language
                  </option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="training-module">Training module *</label>
                <select id="training-module" required>
                  <option value="" disabled selected>
                    Choose training module
                  </option>
                  <option value="module-1">Module 1</option>
                  <option value="module-2">Module 2</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="training-date">Training scheduled date *</label>
                <input
                  type="date"
                  id="training-date"
                  placeholder="22/11/2024"
                  required
                />
              </div>
              <div
                className="form-group time-group"
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <div>
                  <label htmlFor="training-start-time">
                    Training start time *
                  </label>
                  <input
                    style={{ width: "200px" }}
                    type="time"
                    id="training-start-time"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="training-end-time">Training end time *</label>
                  <input
                    style={{ width: "200px" }}
                    type="time"
                    id="training-end-time"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="training-mode">Training mode *</label>
                <select id="training-mode" required>
                  <option value="" disabled selected>
                    Choose mode i.e Google Meet
                  </option>
                  <option value="google-meet">Google Meet</option>
                  <option value="zoom">Zoom</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="training-link">Training link *</label>
                <input
                  type="url"
                  id="training-link"
                  placeholder="https://meet.google.com/..."
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              <FaPaperPlane className="icon" /> Training Invitation Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewTraining;
