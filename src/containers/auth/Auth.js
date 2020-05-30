import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import myProfile from "./MyProfile";
import Public from "../public/Public";

let Auth = class Auth extends Component {
  render() {
    return <Switch>
      <Route path="/auth/login" component={Login}/>
      <Route path="/auth/register" component={Register}/>
      <Route path="/auth/reset-password" component={ForgotPassword}/>
      <Route path="/auth/myprofile" component={myProfile}/>
      <Route path="/auth/" component={Public}/>
    </Switch>
  }
}

export default Auth;
