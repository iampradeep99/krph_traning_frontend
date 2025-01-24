import { ApiCalling } from "../../../../Service/Utilities/apiCalling";
import APIEndpoints from "./Endpoint";


export const getRegionStateCity = async (formData) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(requestData, APIEndpoints.Common.GetRegionStateCity,);
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


export const addAdmins = async(formData)=>{
    try{
        const requestData = {
            main: {
              ...formData,
            },
          };
    const result = await ApiCalling(requestData, APIEndpoints.Common.AddAdmin,);
    if (result.responseCode === 1) {
        if (result.responseData) {
          return { response: result };
        }
        return { response: result };
      }
      return { response: result };


    }catch(error){
        console.log(error);
        return { response: { responseCode: 0, responseData: null, responseMessage: error } };
    }
}

export const addSupervisor = async(formData)=>{
  try{
      const requestData = {
          main: {
            ...formData,
          },
        };
  const result = await ApiCalling(requestData, APIEndpoints.Common.AddSupervisor,);
  if (result.responseCode === 1) {
      if (result.responseData) {
        return { response: result };
      }
      return { response: result };
    }
    return { response: result };


  }catch(error){
      console.log(error);
      return { response: { responseCode: 0, responseData: null, responseMessage: error } };
  }
}

