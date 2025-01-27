import axios from "axios";
import { Buffer } from "buffer";
import Config from "../../../Configuration/Config.json";

const pako = require("pako");


export const resetPassword = async (payload) => {
  try {
    

    const response = await axios.post(
      `${Config.BaseUrl}auth/updatePassword`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (response.status === 200) {
      const result = await response.data;
      if (result.responseCode.toString() === "1") {
        return {
          responseCode: 1,
          responseData: result.responseData, 
          responseMessage: result.responseMessage,
        };
      }
      return {
        responseCode: 0,
        responseData: result.responseData,
        responseMessage: result.responseMessage,
      };
    }
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: "An error occurred while processing the request.",
    };
  } catch (error) {
    console.log(error);
    return {
      responseCode: 0,
      responseData: null,
      responseMessage: error.response?.data?.responseMessage || "Unexpected error occurred",
    };
  }
};



