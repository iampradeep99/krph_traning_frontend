import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
const encryptedKey = "cfcfcgjh-hghgh-3hgh4ge-6refcg-hgfhf75rtdcgfcbv";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptedKey).toString();
};

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptedKey);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

export const setSessionStorage = (key, data) => {
  debugger;
  const encryptedData = encryptData(data);
  sessionStorage.setItem(key, encryptedData);
};

export const getSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    const result = decryptData(data);
    return result;
  }
  return null;
};

export const setEncryptSessionStorage = (key, data) => {
  const encryptedData = encryptData(data);
  sessionStorage.setItem(key, encryptedData);
};

export const getDecryptSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    const result = decryptData(data);
    return result;
  }
  return null;
};

export const checkAuthExist = () => {
  debugger;
  const userData = getDecryptSessionStorage("user");
  const tokenData = getDecryptSessionStorage("token");
  let decodeData;
  if (tokenData) {
    decodeData = jwtDecode(tokenData);
  }

  // const userDataro = getDecryptSessionStorage("user");
  // console.log("This is UserData " + JSON.stringify(userData));
  if (userData) {
    const expiryDate = decodeData.expiryTime;
    const loginDate = decodeData.loginTime;
    if (expiryDate) {
      // const date1 = new Date(expiryDate * 1000);
      // const currentDate =  date1.toLocaleString();
      // const date = new Date(expiryDate);
      // const now = new Date();
      // Now.setMinutes(now.getMinutes() + 59);
      // Console.log(date, now);
      if (expiryDate > loginDate) {
        return true;
      }
      sessionStorage.removeItem("IsLoggedIn");
      return false;
    }
    sessionStorage.removeItem("IsLoggedIn");
    return false;
  }
  sessionStorage.removeItem("IsLoggedIn");
  return false;
};

// A export const checkAuthExist = () => {
// A  debugger;
// A  const userData = getSessionStorage("user");
// A  const pCurrentDateTime = getSessionStorage("CurrentDateAndTime");
// A  if (userData && pCurrentDateTime) {
// A    const expiryDate = moment.parseZone(userData.token.validTo);
// A    const currentDateTimeDate = moment.parseZone(pCurrentDateTime);
// A    if (expiryDate && pCurrentDateTime) {
// A      const validToDateTime = new Date(expiryDate);
// A      const currDateTime = new Date(currentDateTimeDate);
// A      if (validToDateTime > currDateTime) {
// A        return true;
// A      }
// A      sessionStorage.removeItem("IsLoggedIn");
// A      return false;
// A    }
// A    sessionStorage.removeItem("IsLoggedIn");
// A    return false;
// A  }
// A  sessionStorage.removeItem("IsLoggedIn");
// A  return false;
// A };

export const getUserRightCodeAccess = (rightCode) => {
  const data = getSessionStorage("UserRights");
  if (data) {
    const filterData = data.filter((data) => {
      return (
        (data && data.RightCode
          ? data.RightCode.toString().toUpperCase().trim()
          : "") === rightCode.toString().toUpperCase().trim()
      );
    });

    if (filterData.length > 0) {
      return true;
    }
  }
  return false;
};

export const validatePassword = (Enteredtext) => {
  let errors = "";
  const lowerCaseLetters = new RegExp(/[a-z]/g);
  const regex = new RegExp(/[!@#$%^&*(),.?":{}|<>]/g);
  const upperCaseLetters = new RegExp(/[A-Z]/g);
  const numbers = new RegExp(/[0-9]/g);
  const whiteSpace = new RegExp(/\s/);

  if (whiteSpace.test(Enteredtext)) {
    errors = "Password should not contain white space";
  } else if (!lowerCaseLetters.test(Enteredtext)) {
    errors = "Password must contain at least one lowercase letter";
  } else if (!upperCaseLetters.test(Enteredtext)) {
    errors = "Password must contain at least one uppercase letter";
  } else if (!numbers.test(Enteredtext)) {
    errors = "Password must contain at least one digit";
  } else if (!regex.test(Enteredtext)) {
    errors = "Password must contain at least one symbol character";
  } else if (Enteredtext.length < 8) {
    errors = "Password must be 8 characters.";
  } else if (Enteredtext.length > 16) {
    errors = "Password must be 16 characters.";
  }

  return errors;
};

export const encryptStringData = (data) => {
  try {
    const encodedStringBtoA = btoa(data);
    return encodedStringBtoA;
  } catch (err) {
    return null;
  }
};

export const decryptStringData = (data) => {
  try {
    const decodedStringAtoB = atob(data);
    return decodedStringAtoB;
  } catch (err) {
    return null;
  }
};

export const decodeJWTToken = (token) => {
  const decodedToken = jwtDecode(token[0].token);
  if (decodedToken) {
    return decodedToken;
  }
  return null;
};

// This is token logic

const isTokenValid = (token) => {
  return token !== null && token !== "";
};

// Function to check if the user is authenticated
export const checkAuthExisttoken = () => {
  const userData = getSessionStorage("user");
  console.log("This is UserData " + JSON.stringify(userData));

  if (userData) {
    const token = userData.token;

    if (token) {
      const isValid = isTokenValid(token);

      if (isValid) {
        return true;
      } else {
        sessionStorage.removeItem("IsLoggedIn");
        handleTokenExpiration();
        return false;
      }
    }
  }

  sessionStorage.removeItem("IsLoggedIn");
  return false;
};

// Function to handle operations when the token is considered invalid
const handleTokenExpiration = () => {
  console.log(
    "Token is invalid or expired. Perform necessary operations like logout or redirection.",
  );
  sessionStorage.clear();
};

// Function to check the token validity every 60 seconds (1 minute)
export const startTokenValidation = () => {
  setInterval(() => {
    const isValid = checkAuthExisttoken();
    if (!isValid) {
      console.log("Token has expired or is invalid.");
    }
  }, 60000);
};

startTokenValidation();
