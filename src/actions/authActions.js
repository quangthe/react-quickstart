export const AUTH0_AUTHENTICATION = "AUTH0_AUTHENTICATION";
export const auth0Authentication = authResult => {
  return {
    type: AUTH0_AUTHENTICATION,
    payload: authResult
  };
};

export const AUTH0_LOGOUT = "AUTH0_LOGOUT";
export const auth0Logout = () => {
  return {
    type: AUTH0_AUTHENTICATION,
    payload: {}
  };
};
