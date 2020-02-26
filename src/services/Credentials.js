// This service holds the current user information
// It tells if any user is  currently logged in
// It stores the current user data when they
import axios from 'axios';

export const getToken = () => {
  const curUser = JSON.parse(localStorage.getItem('curUser'));
  return curUser && curUser.token;
};

// Returns a boolean depending on whether or not the user has his token stored in the localStorage
export const isUserSignedIn = () => getToken();

const getCredentials = () => {
  const curUser = JSON.parse(localStorage.getItem('curUser'));
  return curUser && curUser;
};

export const getPermissions = () => {
  const { role } = getCredentials();
  return role;
};

export const storeUserProfile = async () => {
  const res = await axios.get('/users');

  if (res) {
    const user = JSON.stringify(
      res.data.data.filter(user => (user.ippisNo = 94350))[0]
    );
    localStorage.setItem('user', user);
  } else {
    console.error('unable to fetch user profile');
  }
};

export const getUserProfileLocally = () => {
  const profile = JSON.parse(localStorage.getItem('user'));
  console.log(profile);
  return profile || {};
};

export const forceLogout = () => {
  localStorage.removeItem('curUser');
  if (
    window.location &&
    window.location !== undefined &&
    window.location !== null
  ) {
    window.location.reload();
  }
};

export default getCredentials;
