import axios from "axios";
import { Buffer } from "buffer";
import Config from "../../Configuration/Config.json";
import publicIp from "public-ip";
const pako = require("pako");

export const authenticate = async (userName, password) => {
  try {
    const ip = await publicIp.v4();
    const requestData = {
      loginUID: userName,
      loginPWD: password,
      objCommon: {
        insertedUserID: "1",
        insertedIPAddress: ip,
        dateShort: "dd-MM-yyyy",
        dateLong: "dd-MM-yyyy- HH:mm:ss",
      },
    };

    const response = await axios.post(Config.Authenticate, requestData);
    if (response.status === 200) {
      const result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(
          result.responseDynamic ? result.responseDynamic : "",
          "base64"
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
      responseMessage: error.message,
    };
  }
};
