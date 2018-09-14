import md5 from 'md5';

const USERDATA_KEY = 'userData';

export const getUserData = () => JSON.parse(localStorage.getItem(USERDATA_KEY));

export const storeUserData = userData =>
  localStorage.setItem(USERDATA_KEY, JSON.stringify(userData));

export const deleteUserData = () => localStorage.removeItem(USERDATA_KEY);

export const getGravatar = () => {
  const userData = getUserData();
  if (!userData || !userData.user || !userData.user.email) return '';
  const hash = md5(userData.user.email);
  return `https://gravatar.com/avatar/${hash}?s=200&d=robohash`;
};
