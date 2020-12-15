import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const RootAuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      path={rest.path}
      render={(props) =>
        rest.user ? <Component /> : <Redirect to="/signin" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.userstate.user,
});

const AuthenticatedRoute = connect(
  mapStateToProps,
  null
)(RootAuthenticatedRoute);

export default AuthenticatedRoute;
