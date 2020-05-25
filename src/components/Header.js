import React from "react";
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Header.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div
        className="navbar-collapse collapse w-100 order-1 order-md-0"
        id="dual-collapse2"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/About" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <p
          className="navbar-brand mx-auto"
          style={{ padding: "0", margin: "0" }}
        >
          GIRIRAJ INDUSTRIES
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#dual-collapse2"
          style={{ marginLeft: "50px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div
        className="navbar-collapse collapse w-100 order-3"
        id="dual-collapse2"
      ></div>
    </nav>
  );
}

export default Navbar;
