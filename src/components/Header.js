import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand style={{ fontSize: "15px" }}>
        GIRIRAJ INDUSTRIES
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Text style={{ padding: "0px" }}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Navbar.Text>
          <Navbar.Text style={{ padding: "0px" }}>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </Navbar.Text>
          <Navbar.Text style={{ padding: "0px" }}>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </Navbar.Text>
          <Navbar.Text style={{ padding: "0px" }}>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </Navbar.Text>
        </Nav>
        <Nav>
          <Navbar.Text style={{ padding: "0px" }}>
            <Link to="/cart" className="nav-link">
              <i className="fa fa-cart-plus" style={{ fontSize: "22px" }}></i>
            </Link>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
