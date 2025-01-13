import { ApiCalling } from "../../Service/Utilities/apiCalling";
import APIEndpoints from "../Endpoint/endpoint";

export const getBrandmasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Brand.GetBrandmaster
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const addBrandMasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Brand.AddBrandMaster
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const updateBrandMasterData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Brand.UpdateBrandMaster
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const updateBrandStatusData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.Category.UpdateBrandStatus
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};