import axios from "axios";
import { Buffer } from "buffer";
import Config from "../../../Configuration/Config.json";

const pako = require("pako");

export const authenticate = async (userName, password) => {
  debugger;
  try {
    const requestData = {
      email: userName,
      password: password,
    };
    const response = await axios.post(
      `${Config.BaseUrl}auth/login`,
      requestData,
    );
    if (response.status === 200) {
      const result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(
          result.responseDynamic ? result.responseDynamic : "",
          "base64",
        );
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return {
            responseCode: 1,
            responseData: Data,
            responseMessage: result.responseMessage,
          };
        }
        return {
          responseCode: 1,
          responseData: [],
          responseMessage: result.responseMessage,
        };
      }

      return {
        responseCode: 0,
        responseData: result,
        responseMessage: result.responseMessage,
      };
    }
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: "Login Error",
    };
  } catch (error) {
    console.log(error);
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: error.response.data.responseMessage,
    };
  }
};

export const getUserByID = async (tokenVal, token) => {
  debugger;


  try {
    const requestData = {
      userId: tokenVal.userId,
    };

    const response = await axios.post(
      `${Config.BaseUrl}agent/getById`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      },
    );
    if (response.status === 200) {
      const result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(
          result.responseDynamic ? result.responseDynamic : "",
          "base64",
        );
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return {
            responseCode: 1,
            responseData: Data,
            responseMessage: result.responseMessage,
          };
        }
        return {
          responseCode: 1,
          responseData: [],
          responseMessage: result.responseMessage,
        };
      }
      return {
        responseCode: 0,
        responseData: result,
        responseMessage: result.responseMessage,
      };
    }
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: "Login Error",
    };
  } catch (error) {
    console.log(error);
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: error.response.data.responseMessage,
    };
  }
};

export const logout = async (AccessUID, SessionID) => {
  try {
    const requestData = {
      appAccessUID: AccessUID,
      sessionID: SessionID,
    };
    const response = await axios.post(
      `${Config.BaseUrl}FGMS/LogOutUser`,
      requestData,
    );
    if (response.status === 200) {
      const result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(
          result.responseDynamic ? result.responseDynamic : "",
          "base64",
        );
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return {
            responseCode: 1,
            responseData: Data,
            responseMessage: result.responseMessage,
          };
        }
        return {
          responseCode: 1,
          responseData: [],
          responseMessage: result.responseMessage,
        };
      }
      return {
        responseCode: 0,
        responseData: result,
        responseMessage: result.responseMessage,
      };
    }
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: "Some Error",
    };
  } catch (error) {
    console.log(error);
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: error.response.data.responseMessage,
    };
  }
};
