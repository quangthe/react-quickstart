import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { simpleAction, simpleAsyncAction } from "./actions/appActions";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(simpleAction("simple action"));
    this.props.dispatch(simpleAsyncAction("simple ASYNC action"));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connect()(App);
