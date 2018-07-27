import decode from 'jwt-decode';

const USERDATA_KEY = 'userData';

export const storeUserData = userData => {
  localStorage.setItem(USERDATA_KEY, JSON.stringify(userData));
};

// For type, pass 'authToken' or 'refreshToken'.
// Returns null if it is nonexistent or expired.
export const getToken = type => {
  const userData = JSON.parse( localStorage.getItem(USERDATA_KEY) );
  if (!userData || !userData[type]) return null;
  return userData[type];
};

export const isTokenExpired = token => {
  const date = getTokenExpirationDate(token);
  return !! date && date.valueOf() <= new Date().valueOf();
}

const getTokenExpirationDate = token => {
  const decoded = decode(token);
  if (!decoded.exp) return null;
  return new Date(decoded.exp * 1000);
}

export const setAuthToken = newToken => {
  const userData = JSON.parse( localStorage.getItem(USERDATA_KEY) );
  if (!userData || !userData.authToken) return;
  userData.authToken = newToken;
  storeUserData(userData);
};

// Get a universally unique identifier.
export const getUuid = () => (
  [1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);
