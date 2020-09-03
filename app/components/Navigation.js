import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="nav-wrapper bg-dark">
        <div className="container">
          <div className="nav-wrapper bg-dark">
            <Link className="brand-logo" to="/">
              My Passes
            </Link>
          </div>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                View passes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/CreatePass">
                Create a pass
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
