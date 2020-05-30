import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import LoginForm from "../../components/LoginForm";
// import ForgotPassword from "./ForgotPassword";

import { loginAttempt, setErrMsg, resetLoginPage } from "./redux_actions";

const styles = theme => ({
  root: {
    display: "flex",
    //flexWrap: "wrap",
    justifyContent: "space-between"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {}
});

let Login = class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false
    };

    this.notLoggedIn = classes => {
      // if (!this.props.notification.requestToNotify) {
      //   //this.props.requestPermissionToNotify();
      // }
      return (
        <div className={classes.root+" login-cntr"}>
          <div className="login-artifact" />
          <LoginForm
            loginAttempt={this.props.loginAttempt}
            authMsg={this.props.auth.loginErrorMsg}
          />
        </div>
      );
    };

    this.loggedIn = (
      <Redirect
        to={{
          pathname: "/application"
        }}
      />
    );
  }

  componentDidMount() {
    //reset all the values in the state;
    this.props.resetLoginPage();
  }

  render() {
    //this.props.requestPermissionToNotify();
    const { classes } = this.props;
    if (
      this.props.location.pathname === "/channel" &&
      this.props.auth.isLoggedIn
    ) {
      return;
    } else if (this.props.auth.isLoggedIn) {
      return this.loggedIn;
    } else {
      return this.notLoggedIn(classes);
    }
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  resetLoginPage: PropTypes.func,
  loginAttempt: PropTypes.func,
  location: PropTypes.object,
  auth: PropTypes.object
};

Login = withStyles(styles)(Login);

const mapStateToProps = state => ({
  notification: state.notification,
  auth: state.auth
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginAttempt,
      setErrMsg,
      //requestPermissionToNotify,
      resetLoginPage
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Login);
