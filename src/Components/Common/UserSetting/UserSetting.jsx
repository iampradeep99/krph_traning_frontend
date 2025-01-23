import React, { useState } from "react";
import "./UserSetting.scss";
import CommonHeader from "../CommonHeader/CommonHeader";

const UserSetting = () => {
  const permissions = [
    "Dashboard",
    "Training Calendar",
    "Create New Agent",
    "Modify Agent",
    "Reports",
    "Profile",
    "Setting",
  ];

  const roles = ["Super Admin", "Admin", "Team Leader", "Agent"];

  // Initialize all permissions as unchecked (false)
  const initialRolePermissions = roles.reduce((acc, role) => {
    acc[role] = Array(permissions.length).fill(false); // All false
    return acc;
  }, {});

  // State for role permissions
  const [rolePermissions, setRolePermissions] = useState(
    initialRolePermissions,
  );

  // Toggle permission state
  const togglePermission = (role, index) => {
    setRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: prevPermissions[role].map((perm, idx) =>
        idx === index ? !perm : perm,
      ),
    }));
  };

  return (
    <div className="form-wrapper-agent">
      <CommonHeader title="Profile Setting" />
      <div className="user-setting">
        <div className="tabs">
          <span className="tab active">User Management</span>
          <span className="tab">Flow Management</span>
          <span className="tab">Team Members</span>
          <span className="tab">Profile</span>
          <span className="tab">Password</span>
        </div>
        <div className="permissions">
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                {roles.map((role) => (
                  <th key={role}>{role}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission, index) => (
                <tr key={permission}>
                  <td>{permission}</td>
                  {roles.map((role) => (
                    <td key={role}>
                      <input
                        type="checkbox"
                        checked={rolePermissions[role][index]}
                        onChange={() => togglePermission(role, index)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
