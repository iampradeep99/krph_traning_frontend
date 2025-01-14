import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Framework/Assets/Styles/main.scss";
import { LicenseManager } from "ag-grid-enterprise";
import PageRouter from "./Configuration/PageRouter/PageRouter";
import LicenseKeys from "./Configuration/Utilities/LicenseManager/LicenseKeys.json";
import NotificationProvider from "./Framework/Components/Widgets/Notification/NotificationProvider";
import reportWebVitals from './reportWebVitals';
LicenseManager.setLicenseKey(LicenseKeys.AgGrid);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <NotificationProvider>
    <PageRouter />
  </NotificationProvider>

);


reportWebVitals();
