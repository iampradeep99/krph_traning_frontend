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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div class="wrapper">
        <Header toggleSidebar={toggleSidebar} />
        <SideBarModified isSidebarOpen={isSidebarOpen} />
        <div class="content-wrapper">{component}</div>
      </div>
    </>
  );
}

export default Page;

Page.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};
