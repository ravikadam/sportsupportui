import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import ApplicationHome from "./channelDashboard"
import ApplicationPrepare from "./channelPrepare"
import Public from "../public/Public";

let Application = class Application extends Component {
  render() {
    return <Switch>
      <Route path="/application/Home" component={ApplicationHome}/>
      <Route path="/application/prepare/" component={ApplicationPrepare}/>
      <Route path="/application/" component={Public}/>
    </Switch>
  }
}

export default Application;
