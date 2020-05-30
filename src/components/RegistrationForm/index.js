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
import "./Registration.css";

const styles = {};

class Registration extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    email: "",
    password: "",
    showPassword: false,
    accesscode: "",
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
    const toLogin = props => <Link to="../auth/login" {...props} />;
    const toResetPassword = props => <Link to="../auth/reset-password" {...props} />;
    return (
      <div className={"auth-form-cntr"}>
      <Typography variant="title" color="primary" align="center" gutterBottom>
        New User Registration
      </Typography>
        <form>
          <div className="loginform-cntr">
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
          
            <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Access Code</InputLabel>
            <Input
              id="accesscode"
              label="Access Code"
              type="text"
              autoComplete="on"
              value={this.state.accesscode}
              onChange={this.handleChange("accesscode")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">First Name</InputLabel>
            <Input
              id="firstname"
              label="First Name"
              type="text"
              autoComplete="on"
              value={this.state.firstname}
              onChange={this.handleChange("firstname")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Last Name</InputLabel>
            <Input
              id="lastname"
              label="Last Name"
              type="text"
              autoComplete="on"
              value={this.state.lastname}
              onChange={this.handleChange("lastname")}
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
                  let { email, password ,accesscode, firstname, lastname} = this.state;
                  this.props.registerAttempt({
                    email,
                    password,
                    accesscode,
                    firstname,
                    lastname,
                    successCallBack: () => {
                      // console.debug("success");
                    },
                    failureCallback: () => {
                      // console.log("failed");
                    }
                  });
                }}
              >
                Register
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
                  component={toLogin}
                >
                  Already a user?
                </Typography>
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
  registerAttempt: PropTypes.func,
  authMsg: PropTypes.string
};

export default withStyles(styles)(Registration);
