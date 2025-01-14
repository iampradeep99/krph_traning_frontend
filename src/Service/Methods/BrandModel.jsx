import { ApiCalling } from "../../Service/Utilities/apiCalling";
import APIEndpoints from "../Endpoint/endpoint";

export const getBrandSKUData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.BrandModel.GetBrandSKU
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const addBrandSKUData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.BrandModel.AddBrandSKU
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const updateBrandSKUData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(
      requestData,
      APIEndpoints.BrandModel.UpdateBrandSKU
    );
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};

export const updateBrandSKUStatusData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandModel.UpdateBrandSKUStatus
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };

  export const getBrandimagesData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandModel.GetBrandimages
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };

  export const addBrandimagesData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandModel.AddBrandimages
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };
  
  export const deleteBrandimagesData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandModel.DeleteBrandimages
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };
