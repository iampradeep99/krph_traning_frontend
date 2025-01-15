import axios from "../../Configuration/axios/axios";
import { Buffer } from "buffer";
import publicIp from "public-ip";

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
export const ApiCalling = async (requestApiData, apiPath, header) => {
  try {
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

      if (result.responseMessage === "null") {
        const resp = IfnullApiCalling(requestApiData, apiPath, header);
        return resp;
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
