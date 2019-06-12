import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Callback.css";

class Callback extends Component {
  render() {
    return (
      <div className="center-parent">
        <div className="center-container">
          <FontAwesomeIcon icon="sync-alt" spin />
        </div>
      </div>
    );
  }
}

export default Callback;
