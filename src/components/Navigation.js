import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Woman from "./WomanSection";
import Kids from "./KidsSection";
import Man from "./ManSection";
import Covid from "./CovidSection";

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Woman" component={Woman} />
      <Route exact path="/Kids" component={Kids} />
      <Route exact path="/Man" component={Man} />
      <Route exact path="/Covid" component={Covid} />
    </Switch>
  );
}
export default Main;
