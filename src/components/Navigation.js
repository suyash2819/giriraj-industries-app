import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import WomanCardList from "./WomanSection";
import KidsCardList from "./KidsSection";
import ManCardList from "./ManSection";
import CovidCardList from "./CovidSection";
import CartDisplay from "./CartDisplay";
import UserSignUp from "./UserFunctionality/UserSignUp";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/woman" component={WomanCardList} />
      <Route exact path="/kids" component={KidsCardList} />
      <Route exact path="/man" component={ManCardList} />
      <Route exact path="/covid" component={CovidCardList} />
      <Route exact path="/cart" component={CartDisplay} />
      <Route exact path="/usersignup" component={UserSignUp} />
    </Switch>
  );
};
export default Main;
