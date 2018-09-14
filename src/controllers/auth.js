import decode from 'jwt-decode';
import { getUserData, storeUserData } from './userData';

// For type, pass 'authToken' or 'refreshToken'.
// Returns null if it is nonexistent or expired.
export const getToken = type => {
  const userData = getUserData();
  return userData && userData[type] ? userData[type] : null;
};

const getTokenExpirationDate = token => {
  const decoded = decode(token);
  return decoded.exp ? new Date(decoded.exp * 1000) : null; // Convert to milliseconds.
};

export const isTokenExpired = token => {
  const date = getTokenExpirationDate(token);
  return !date || date.valueOf() <= Date.now();
};

export const setAuthToken = authToken => {
  const userData = getUserData();
  if (!userData) return;
  storeUserData({ ...userData, authToken });
};

export const isAuthTokenValid = () => {
  const token = getToken('authToken');
  return !!token && !isTokenExpired(token);
};

// Get a universally unique identifier.
export const getUuid = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16) // eslint-disable-line no-bitwise
  );
