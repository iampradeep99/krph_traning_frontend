import { ApiCalling } from "../../Service/Utilities/apiCalling";
import APIEndpoints from "../Endpoint/endpoint";


export const getBrand_CategoryData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandAwards.GetBrand_Category
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };

  export const addBrandCategoryMasterData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandAwards.AddBrandCategoryMaster
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };

  export const updateBrandCategoryMasterData = async (formData) => {
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(
        requestData,
        APIEndpoints.BrandAwards.UpdateBrandCategoryMaster
      );
      return result;
    } catch (error) {
      console.log(error);
      return {
        response: { responseCode: 0, responseData: null, responseMessage: error },
      };
    }
  };