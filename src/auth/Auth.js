import auth0 from "auth0-js";
import { history } from "../configureStore";

export default class Auth {
  authResult;
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
    responseType: process.env.REACT_APP_RESPONSE_TYPE,
    scope: process.env.REACT_APP_SCOPE,
    audience: process.env.REACT_APP_AUDIENCE
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getAuthResult = this.getAuthResult.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(dispatch) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, dispatch);
      } else if (err) {
        history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAuthResult() {
    return this.authResult;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    sessionStorage.setItem("__auth__", JSON.stringify(authResult));

    // Set the time that the Access Token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.authResult = authResult;

    // navigate to the home route
    history.replace("/");
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.authResult = null;
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // clear everything in session
    sessionStorage.clear();

    localStorage.setItem("isLoggedIn", "false");

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace("/");

    // logout other tabs
    localStorage.setItem("__cleanup__", "" + new Date());
    localStorage.removeItem("__cleanup__");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
