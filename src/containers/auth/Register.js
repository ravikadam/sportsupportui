import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Registration from "../../components/RegistrationForm";

import { registerAttempt, setErrMsg, resetLoginPage } from "./redux_actions";

const styles = theme => ({
  root: {
    display: "flex",
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

let Register = class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      firstname: "",
      lastname: "",
      name: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      location: "",
      title: "",
      accesscode: "",
      accessValidTillDate: "",
      role: [],
      parentid: "",
      organizationid: "",
    };

    this.notLoggedIn = classes => {
      return (
        <div className={classes.root}>
          <div className="login-artifact" />
          <Registration
            registerAttempt={this.props.registerAttempt}
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

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  resetLoginPage: PropTypes.func,
  registerAttempt: PropTypes.func,
  location: PropTypes.object,
  auth: PropTypes.object
};

Register = withStyles(styles)(Register);

const mapStateToProps = state => ({
  notification: state.notification,
  auth: state.auth
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      registerAttempt,
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
)(Register);
