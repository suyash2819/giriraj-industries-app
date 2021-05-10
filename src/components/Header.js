import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fire } from "../config/firebase";
import { userSignedIn, displayLoader, localToStore } from "../store/reducer";
import "../CSS/Header.css";

const RootnavBar = (props) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-light"
      variant="dark"
      fixed="top"
    >
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
          {props.user ? (
            <>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link
                  className="nav-link"
                  onClick={() => {
                    fire.auth().signOut();
                    props.userSignedIn(null);
                    props.localToStore();
                  }}
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
          {!!props.user && (
            <Navbar.Text>Welcome {props.user.displayName}</Navbar.Text>
          )}
          <Navbar.Text style={{ padding: "0px" }}>
            <Link to="/cart" className="nav-link">
              <i className="fa fa-cart-plus" style={{ fontSize: "22px" }}></i>
              {!!props.cartItems.length && (
                <span className="badge badge-pill badge-primary">
                  {props.cartItems.length}
                </span>
              )}
            </Link>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.userstate.user,
  loader: state.loaderstate.loader,
  cartItems: state.cartstate.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  userSignedIn: bindActionCreators(userSignedIn, dispatch),
  displayLoader: bindActionCreators(displayLoader, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
});

const NavBar = connect(mapStateToProps, mapDispatchToProps)(RootnavBar);

export default NavBar;
