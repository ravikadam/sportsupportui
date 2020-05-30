import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import myProfile from "../../components/MyProfileForm";

import { myprofileAttempt, setErrMsg, resetLoginPage } from "./redux_actions";

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

let MyProfile = class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };

    // this.notLoggedIn = classes => {
    //   return (
    //     <div className={classes.root+" login-cntr"}>
    //       <div className="login-artifact" />
    //       <LoginForm
    //         loginAttempt={this.props.loginAttempt}
    //         authMsg={this.props.auth.loginErrorMsg}
    //       />
    //     </div>
    //   );
    // };

    // this.loggedIn = classes => {
        return (
          // <div className={classes.root+" login-cntr"}>
          <div>
            <div className="login-artifact" />
            <myProfile
              myprofileAttempt={this.props.myprofileAttempt}
              authMsg={this.props.auth.loginErrorMsg}
            />
          </div>
        );
  //     };
  }

  componentDidMount() {
    //reset all the values in the state;
    this.props.resetLoginPage();
  }
};

MyProfile.propTypes = {
  resetLoginPage: PropTypes.func,
  myprofileAttempt: PropTypes.func,
  location: PropTypes.object,
  auth: PropTypes.object
};
MyProfile = withStyles(styles)(MyProfile);

const mapStateToProps = state => ({
  auth: state.auth
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      myprofileAttempt,
      setErrMsg,
      resetLoginPage
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(MyProfile);