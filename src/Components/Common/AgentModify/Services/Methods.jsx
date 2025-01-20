  import { ApiCalling } from "../../../../Service/Utilities/apiCalling";
  import APIEndpoints from "./EndPoint";
 

  export const getAllAgent = async (formData) => {
    debugger;
    try {
      const requestData = {
        main: {
          ...formData,
        },
      };
      const result = await ApiCalling(requestData, APIEndpoints.Common.GetAllAgent,);
      if (result.responseCode === 1) {
        if (result.responseData) {
          return { response: result };
        }
        return { response: result };
      }
      return { response: result };
    } catch (error) {
      console.log(error);
      return { response: { responseCode: 0, responseData: null, responseMessage: error } };
    }
  };

