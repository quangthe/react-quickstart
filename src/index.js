import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from "./configureStore";
import Auth from "./auth/Auth";
import Callback from "./auth/Callback";
import { auth0Logout } from "./actions/authActions";

// font-awesome builder
import "./faLibrary";
import "./index.css";

const store = configureStore(/* provide initial state if any */);

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(store.dispatch);
  }
};

//
// HANDLE PAGE REFRESH
//
const authKey = "__auth__";

// trigger when users close a tab or quite browser
window.addEventListener("beforeunload", ev => {
  // before tab is close or browser is closed
  try {
    if (auth && auth.getAuthResult()) {
      const serializedState = JSON.stringify(auth.getAuthResult());
      localStorage.setItem(authKey, serializedState);
    }
  } catch (e) {
    // ignore write errors
  }

  // silently quit, there's nothing to show confirm popup
  return undefined;
});

if (localStorage.getItem(authKey)) {
  try {
    const authResult = JSON.parse(localStorage.getItem(authKey));
    auth.setSession(authResult);
    localStorage.removeItem(authKey);
  } catch (e) {
    console.log("Cannot restore auth result");
  }
}
//
// END HANDLE PAGE REFRESH
//

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <App auth={auth} {...props} />}
        />
        <Route
          path="/login"
          render={props => {
            auth.login();
          }}
        />
        <Route
          path="/logout"
          render={props => {
            store.dispatch(auth0Logout());
            auth.logout();
          }}
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
