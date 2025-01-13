import { ApiCalling } from "../../Service/Utilities/apiCalling";
import APIEndpoints from "../Endpoint/endpoint";

export const getCategorymasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Home.GetCategorymaster
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const getYearmasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Home.GetYearmaster
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const getYearwiseTopbrandData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Home.GetYearwiseTopbrand
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};
