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
