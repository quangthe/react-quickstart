import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from "./configureStore";

const store = configureStore(/* provide initial state if any */);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <App />} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
