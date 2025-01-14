import React, { useEffect } from "react";
import "../../../plugins/fontawesome-free/css/all.min.css";
import "../../../dist/css/adminlte.css";
import "../../../dist/css/style.css";
import Header from "../../../Components/Common/Header/Header.jsx";
import SideBar from "../../../Components/Common/SideBar/SideBar.jsx";
import "../../../dist/js/adminlte.js";
import "../../../dist/js/demo.js";
import PropTypes from "prop-types";



function Page(props) {
  const { title, component } = props;

  useEffect(() => {
    document.title = title ? `${title} || "KRPH Training Management"` : "KRPH Training Management";
  }, [title]);

  return (
    <>
      <div class="wrapper">
        <Header />
        <SideBar />
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