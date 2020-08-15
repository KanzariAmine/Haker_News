const AUTH_TOKEN = "auth-token";

//the getToken funtion returns the token or null if the user is not logged in yet.
export const getToken = () => localStorage.getItem(AUTH_TOKEN);

//the setToken function updates the token in local storage.
export const setToken = (token) => localStorage.setItem(AUTH_TOKEN, token);

//the deleteToken function removes the token from local storage, when logging out.
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);
