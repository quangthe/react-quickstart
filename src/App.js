import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { simpleAction, simpleAsyncAction } from "./actions/appActions";
import { Link } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(simpleAction("simple action"));
    this.props.dispatch(simpleAsyncAction("simple ASYNC action"));
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {isAuthenticated() && (
            <Link className="App-link" to="/logout">
              Logout
            </Link>
          )}
          {!isAuthenticated() && (
            <Link className="App-link" to="/login">
              Login
            </Link>
          )}
        </header>
      </div>
    );
  }
}

export default connect()(App);
