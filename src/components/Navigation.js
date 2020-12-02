import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { fire } from "../config/firebase";
import { userSignedIn, displayLoader } from "../store/reducer";
import Home from "../pages/Home";
import Section from "../pages/section";
import CartDisplay from "./CartDisplay";
import UserSignUp from "../pages/auth/UserSignUp";
import UserSignIn from "../pages/auth/UserSignIn";
import Checkout from "../pages/Checkout";
import Loader from "./Loader";
import ItemDetail from "../pages/ItemDetails";

const Rootmain = (props) => {
  useEffect(() => {
    fire.auth().onAuthStateChanged(function handleAuthStateChange(user) {
      if (user) {
        props.userSignedIn(user);
      }
      props.displayLoader(false);
    });
  });

  if (props.loader) {
    return <Loader />;
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* TODO: Make the sections dynamic or generate sections at runtime */}
      <Route
        exact
        path="/women"
        render={() => <Section name="women" title="Women" />}
      />
      <Route
        exact
        path="/kids"
        render={() => <Section name="kids" title="Kids" />}
      />
      <Route
        exact
        path="/covid"
        render={() => <Section name="covid" title="Covid" />}
      />
      <Route
        exact
        path="/men"
        render={() => <Section name="men" title="Men" />}
      />
      <Route exact path="/cart" component={CartDisplay} />
      <Route exact path="/signup" component={UserSignUp} />
      <Route exact path="/signin" component={UserSignIn} />
      <Route exact path="/checkout" component={Checkout}>
        {props.user ? (
          <Route exact path="/checkout" component={Checkout} />
        ) : (
          <Redirect to="/signin" />
        )}
      </Route>
      <Route
        exact
        path="/details/:itemType/:itemName/:itemId"
        component={ItemDetail}
      />
    </Switch>
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
});

const Main = connect(mapStateToProps, mapDispatchToProps)(Rootmain);

export default Main;
