import { ApiCalling } from "../../../../Service/Utilities/apiCalling";
import { getSessionStorage } from "../../../Login/Auth/auth";
import APIEndpoints from "./Endpoint";


export const sidebar = async()=>{
    let data = getSessionStorage('useriInfo');
    console.log("getting session", data);
}

export const getSideBarMenu = async (formData) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(requestData, APIEndpoints.SideBar.GetAllAgent,);
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

