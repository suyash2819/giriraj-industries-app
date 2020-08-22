import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { fire } from "../config/firebase";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { userSignedIn, displayLoader } from "./reducer";
import Home from "./Home";
import WomanCardList from "./WomanSection";
import KidsCardList from "./KidsSection";
import ManCardList from "./ManSection";
import CovidCardList from "./CovidSection";
import CartDisplay from "./CartDisplay";
import UserSignUp from "./UserFunctionality/UserSignUp";
import UserSignIn from "./UserFunctionality/UserSignIn";
import Loader from "./Loader";

const Rootmain = (props) => {
  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
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
      <Route exact path="/woman" component={WomanCardList} />
      <Route exact path="/kids" component={KidsCardList} />
      <Route exact path="/man" component={ManCardList} />
      <Route exact path="/covid" component={CovidCardList} />
      <Route exact path="/cart" component={CartDisplay} />
      <Route exact path="/signup" component={UserSignUp} />
      <Route exact path="/signin" component={UserSignIn} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  loggedInUser: state.userstate.loggedInUser,
  loader: state.loaderstate.loader,
});

const mapDispatchToProps = (dispatch) => ({
  userSignedIn: bindActionCreators(userSignedIn, dispatch),
  displayLoader: bindActionCreators(displayLoader, dispatch),
});

const Main = connect(mapStateToProps, mapDispatchToProps)(Rootmain);

export default Main;
