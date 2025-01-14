import { ApiCalling } from "../../Service/Utilities/apiCalling";
import APIEndpoints from "../Endpoint/endpoint";

export const sendMailData = async (formData) => {
  try {
    const requestData = {
      main: {
        ...formData,
      },
    };
    const result = await ApiCalling(requestData, APIEndpoints.Contact.SendMail);
    return result;
  } catch (error) {
    console.log(error);
    return {
      response: { responseCode: 0, responseData: null, responseMessage: error },
    };
  }
};
