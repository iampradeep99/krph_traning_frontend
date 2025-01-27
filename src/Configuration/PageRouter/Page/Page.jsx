import React, { useEffect, useState } from "react";
import "../../../plugins/fontawesome-free/css/all.min.css";
import "../../../dist/css/adminlte.css";
import "../../../dist/css/style.css";
import Header from "../../../Components/Common/Header/Header.jsx";
import SideBar from "../../../Components/Common/SideBar/SideBar.jsx";
import SideBarModified from "../../../Components/Common/SideBar/SideBarModified.jsx";
import "../../../dist/js/adminlte.js";
import "../../../dist/js/demo.js";
import PropTypes from "prop-types";

function Page(props) {
  const { title, component } = props;

  useEffect(() => {
    document.title = title
      ? "KRPH Training Management"
      : "KRPH Training Management";
  }, [title]);

  // Get the sidebar state from localStorage, defaulting to 'true' if not found
  const savedSidebarState = localStorage.getItem("isSidebarOpen");
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    savedSidebarState !== null ? JSON.parse(savedSidebarState) : true
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Store the new state in localStorage
    localStorage.setItem("isSidebarOpen", JSON.stringify(!isSidebarOpen));
  };

  return (
    <>
      <div className="wrapper">
        <Header toggleSidebar={toggleSidebar} />
        <SideBarModified isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <div className="content-wrapper">{component}</div>
      </div>
    </>
  );
}

export default Page;

Page.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};
