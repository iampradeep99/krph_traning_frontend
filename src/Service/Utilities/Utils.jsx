export const setSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    const result = JSON.parse(data);
    return result;
  }
  return null;
};

export const changeToCapitalize = (str) => {
  if (!str) return str;
  
  let result = '';
  let isFirstChar = true;
  
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    
    if (isFirstChar) {
      if (char >= 'a' && char <= 'z') {
        char = String.fromCharCode(char.charCodeAt(0) - 32);
      }
      isFirstChar = false;
    } else {
      if (char >= 'A' && char <= 'Z') {
        char = String.fromCharCode(char.charCodeAt(0) + 32);
      }
    }
    
    result += char;
  }

  return result;
}
