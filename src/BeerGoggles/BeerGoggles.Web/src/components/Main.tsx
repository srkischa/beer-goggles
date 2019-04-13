import React from "react";
import { Switch, Route } from "react-router-dom";
import Beers from "./beers/Beers";
import Beer from "./beer/Beer";

class Main extends React.Component {
  render() {
    document.title = "Stitching tool";
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Beers} />
          <Route path="/beer/:id" exact component={Beer} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Main;
