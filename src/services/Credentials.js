// This service holds the current user information
// It tells if any user is  currently logged in
// It stores the current user data when they

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

export default getCredentials;
