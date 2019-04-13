import React from "react";
import { Switch, Route } from "react-router-dom";
import Beers from './beers/Beers';

class Main extends React.Component {
    render() {
      document.title = "Stitching tool";
      return (
        <React.Fragment>
          <Switch>
            
            {/* <Route path="/deepzoom/:site/:inspection/:turbine" component={TurbineDeepzoomStatus} /> */}
  
            {/* <Route
              path="/:beer"
              render={({ match }) => (
                <Switch>
                  <Route
                    path={`${match.path}/:inspection`}
                  />
                </Switch>
              )} */}
            />
            <Route path="/" exact component={Beers} />
          </Switch>
        </React.Fragment>
      );
    }
  }
  
  export default Main;