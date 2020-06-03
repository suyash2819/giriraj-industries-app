import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Woman from "./WomanSection";
import Kids from "./KidsSection";
import Man from "./ManSection";
import Covid from "./CovidSection";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/woman" component={Woman} />
      <Route exact path="/kids" component={Kids} />
      <Route exact path="/man" component={Man} />
      <Route exact path="/covid" component={Covid} />
    </Switch>
  );
};
export default Main;
