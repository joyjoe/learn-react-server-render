import React, { Component } from "react";
import Router from "../config/router";
import {Link} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h2>This is a React App</h2>
        <ul>
          <li>
            <Link to="/">to /</Link>
          </li>
          <li>
            <Link to="/detail">To Detail</Link>
          </li>
          <li>
            <Link to="/list">To List</Link>
          </li>
        </ul>
        <Router />
      </div>
    );
  }
}

export default App;
