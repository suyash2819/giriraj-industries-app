import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fire } from "../config/firebase";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  const [loggedInUser, setUser] = useState(false);
  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    }
  });

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
          {loggedInUser ? (
            <>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link
                  className="nav-link"
                  onClick={() => fire.auth().signOut()}
                  to="/"
                >
                  Log Out
                </Link>
              </Navbar.Text>
            </>
          ) : (
            <>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </Navbar.Text>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </Navbar.Text>
            </>
          )}
        </Nav>
        <Nav>
          {loggedInUser ? (
            <Navbar.Text>Welcome {loggedInUser.displayName}</Navbar.Text>
          ) : null}
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
