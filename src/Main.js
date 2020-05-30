import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Auth from "./containers/auth/Auth";
import Public from "./containers/public/Public";
import Application from "./containers/application/Application";

import "./Main.css"

let Main = class Main extends Component {
  render() {
    //console.log(this.props.auth.isLoggedIn);
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={ props =>
          this.props.auth.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    const PublicRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={ props =>
          !this.props.auth.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/application",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/application" component={Application} />
        <PublicRoute exact path="/" component={Public} />
      </Switch>
    );
  }
};

Main.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notification: state.notification,
  auth: state.auth
});

export default withRouter(connect(
  mapStateToProps,
  null
)(Main));
