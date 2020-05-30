import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Input,
  InputLabel,
  FormControl,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { resetPassword, resetForgotPasswordPage } from "./redux_actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

let ForgotPassword = class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstPaint: true
    };

    this.toLogin = props => <Link to="../auth/login" {...props} />;
    this.toRegister = props => <Link to="../auth/register" {...props} />;

    this.handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    this.toLoginButton = _props => (
      <Button
        variant="raised"
        color="primary"
        className="-nav-to-login"
        component={this.toLogin}
      >
        Login
      </Button>
    );

    this.RegisterButton = _props => (
      <Button
        variant="raised"
        color="primary"
        className="-nav-to-login"
        onClick={() => {
          props.resetPassword(this.state.email);
        }}
      >
        Reset Password
      </Button>
    );
  }

  componentWillMount() {
    let { firstPaint } = this.state;
    if (firstPaint) {
      this.props.resetForgotPasswordPage();
      this.setState({ firstPaint: false });
    }
  }

  render() {
    let { auth, classes } = this.props;
    let { resetPasswordInProgress, passwordLinkSent } = auth;

    return (
      <div className="forgot-pw-pg-cntr">
        <div className="forgot-pw-cntr">
          <div>
            <Typography align="center" variant="title" gutterBottom>
              {passwordLinkSent
                ? `We just sent an email to ${this.state.email}`
                : "Forgot your password?"}
            </Typography>
          </div>
          <div className="forgot-pw-text-msg">
            <Typography gutterBottom>
              {passwordLinkSent
                ? "Click the secure link we sent you to reset your password. If you didn't receive an email, check your Spam Folder or try again and make sure you enter the email address associated with channel illumine account."
                : "Enter your email address below and we'll send you a secure link to reset your password"}
            </Typography>
          </div>
        </div>
        {passwordLinkSent ? null : (
          <div>
            <FormControl fullWidth className="input-cntr">
              <InputLabel htmlFor="adornment-password">Email</InputLabel>
              <Input
                id="user-email"
                label="Email"
                type="text"
                autoComplete="on"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
            </FormControl>
          </div>
        )}
        <div>
          <Typography
            className="errorMsg"
            variant="caption"
            gutterBottom
            align="center"
            color="secondary"
          >
            {this.props.auth.forgotPasswordErrorMsg}
          </Typography>
        </div>
        <div>
          {resetPasswordInProgress ? (
            <CircularProgress size={32} className={classes.progress} />
          ) : (
            <FormControl fullWidth className="input-cntr">
              {passwordLinkSent ? this.toLoginButton() : this.RegisterButton()}
            </FormControl>
          )}
        </div>
        <div className="login-link-cntr">
          <Button
            component={ this.toLogin }
          >
            <Typography className="errorMsg" variant="caption" gutterBottom>
              Login
            </Typography>
          </Button>
          <Button
            component= { this.toRegister }
          >
            <Typography
              className="errorMsg"
              variant="caption"
              gutterBottom
              color="primary"
            >
              New User? Register
            </Typography>
          </Button>
        </div>
      </div>
    );
  }
};

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
  resetPassword: PropTypes.func,
  resetForgotPasswordPage: PropTypes.func
};

ForgotPassword = withStyles(styles)(ForgotPassword);

const mapStateToProps = state => ({
  auth: state.auth
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetPassword,
      resetForgotPasswordPage
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ForgotPassword);
