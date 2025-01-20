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
      APIEndpoints.Home.GetCategorymaster,
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const addCategoryMasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Category.AddCategoryMaster,
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const updateCategoryMasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Category.UpdateCategoryMaster,
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const updateCategoryStatusData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Category.UpdateCategoryStatus,
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};
