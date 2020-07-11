import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
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
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
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
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              <i className="fa fa-cart-plus" style={{ fontSize: "36px" }}></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
