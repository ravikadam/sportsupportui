import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import {Visibility, VisibilityOff} from "@material-ui/icons";

// import { sideNavData } from "./tileData";
// import ForgotPassword from "../../containers/ForgotPassword";
import "./LoginForm.css";

const styles = {};

class Loginform extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    email: "",
    password: "",
    showPassword: false
  };
  
  this.handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  this.handleMouseDownPassword = event => {
    event.preventDefault();
  };

  this.handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  }
  render() {
    const { classes } = this.props;
    const toRegister = props => <Link to="../auth/register" {...props} />;
    const toResetPassword = props => <Link to="../auth/reset-password" {...props} />;
    return (
      <div className={"auth-form-cntr"}>
        <Typography variant="title" color="primary" gutterBottom align="center">
          Sign In
        </Typography>
        <form>
          <div className={"loginform-cntr"}>
            <FormControl
              fullWidth
              className={classNames(classes.margin, "input-cntr")}
            >
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
            <FormControl
              fullWidth
              className={classNames(classes.margin, "input-cntr")}
            >
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="user-password"
                label="Password"
                autoComplete="off"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography
              className="errorMsg"
              variant="caption"
              gutterBottom
              align="center"
              color="secondary"
            >
              {this.props.authMsg}
            </Typography>
            <FormControl
              fullWidth
              className={classNames(classes.margin, "input-cntr")}
            >
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                onClick={() => {
                  let { email, password } = this.state;
                  this.props.loginAttempt({
                    email,
                    password,
                    successCallBack: () => {
                      // console.debug("success");
                    },
                    failureCallback: () => {
                      // console.log("failed");
                    }
                  });
                }}
              >
                Login
              </Button>
            </FormControl>
            <div className="login-link-cntr">
              <Button
                className={classes.button}
                component={toResetPassword}
              >
                <Typography className="errorMsg" variant="caption" gutterBottom>
                  Forgot Password?
                </Typography>
              </Button>
              <Button className={classes.button}>
                <Typography
                  className="errorMsg"
                  variant="caption"
                  gutterBottom
                  color="primary"
                  component={toRegister}
                >
                  New User?
                </Typography>
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Loginform.propTypes = {
  classes: PropTypes.object.isRequired,
  loginAttempt: PropTypes.func,
  authMsg: PropTypes.string
};

export default withStyles(styles)(Loginform);
