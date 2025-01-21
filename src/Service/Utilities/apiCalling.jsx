import axios from "../../Configuration/axios/axios";
import { Buffer } from "buffer";
import publicIp from "public-ip";
// import {getSessionStorage} from "../../../Login/Auth/auth";
import {getSessionStorage} from "../../Components/Login/Auth/auth";
import Config from "../../Configuration/Config.json";

const pako = require("pako");

export const IfnullApiCalling = async (requestApiData, apiPath, header) => {
  try {
    console.log("IfnullApiCalling", requestApiData, apiPath, header);
    // if (!checkAuthExist()) {
    //   return {
    //     responseCode: 401,
    //     responseData: null,
    //     responseMessage: "Session Expired",
    //   };
    // }
    const ip = await publicIp.v4();
    const requestData = {
      ...requestApiData.main,
      objCommon: {
        insertedUserID: "1",
        insertedIPAddress: ip,
        dateShort: "yyyy-MM-dd",
        dateLong: "yyyy-MM-dd HH:mm:ss",
      },
    };

    const response = await axios.post(Config.BaseUrl + apiPath, requestData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response && response.status === 200) {
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
        responseCode: result.responseCode,
        responseData: null,
        responseMessage: result.responseMessage,
      };
    }
    return { responseCode: 0, responseData: null, responseMessage: "" };
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      return {
        responseCode: 0,
        responseData: null,
        responseMessage:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.responseMessage
            ? error.response.data.responseMessage
            : "",
      };
    }
    return {
      responseCode: 0,
      responseData: null,
      responseMessage:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.responseMessage
          ? error.response.data.responseMessage
          : "",
    };
  }
};
export const ApiCalling = async (requestApiData, apiPath) => {
  debugger;
  try {
  
    const sessionToken = getSessionStorage("token");

    const requestData = {
      ...requestApiData.main,
    };

  
    const response = await axios.post(Config.BaseUrl + apiPath, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
    });


    if (response && response.status === 200) {
      const result = response.data;

      
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(result.responseDynamic || "", "base64");

        // Decompress and parse response data
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return {
            responseCode: 1,
            responseData: Data,
            responseMessage: result.responseMessage,
          };
        }

        // Handle empty response data
        return {
          responseCode: 1,
          responseData: [],
          responseMessage: result.responseMessage,
        };
      }

      // Handle null response messages with fallback logic
      if (result.responseMessage === "null") {
        const resp = IfnullApiCalling(requestApiData, apiPath, {
          "Content-Type": "application/json",
          Authorization: userData.token,
        });
        return resp;
      }

      // Return error response from the API
      return {
        responseCode: result.responseCode,
        responseData: null,
        responseMessage: result.responseMessage,
      };
    }

    // Return a default failure response if the API response is invalid
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: "",
    };
  } catch (error) {
    // Handle specific 401 unauthorized errors
    if (error?.response?.status === 401) {
      return {
        responseCode: 401,
        responseData: null,
        responseMessage: "Session Expired",
      };
    }

    // Handle other errors
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: error?.message || "An unexpected error occurred",
    };
  }
};

