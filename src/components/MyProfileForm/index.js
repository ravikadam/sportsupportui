import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Input,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import "./MyProfile.css";

const styles = {};

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    accesscode: "",
    name: "",
    title: "",
    firstname: "",
    lastname: "",
    phone: "",
    location: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  };
  
  this.handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  }
  render() {
    const { classes } = this.props;
    return (
      <div className={"auth-form-cntr"}>
      <Typography variant="title" color="primary" align="center" gutterBottom>
        My Profile
      </Typography>
        <form>
          <div className="loginform-cntr">

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Title</InputLabel>
            <Input
              id="title"
              label="Title"
              type="text"
              autoComplete="on"
              value={this.state.title}
              onChange={this.handleChange("title")}
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

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Phone</InputLabel>
            <Input
              id="phone"
              label="Phone"
              type="text"
              autoComplete="on"
              value={this.state.phone}
              onChange={this.handleChange("phone")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Address1</InputLabel>
            <Input
              id="address1"
              label="Address"
              type="text"
              autoComplete="on"
              value={this.state.address1}
              onChange={this.handleChange("address1")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Address2</InputLabel>
            <Input
              id="address2"
              label="Address2"
              type="text"
              autoComplete="on"
              value={this.state.address2}
              onChange={this.handleChange("address2")}
            />
          </FormControl>


          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">City</InputLabel>
            <Input
              id="city"
              label="City"
              type="text"
              autoComplete="on"
              value={this.state.city}
              onChange={this.handleChange("city")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">State</InputLabel>
            <Input
              id="state"
              label="State"
              type="text"
              autoComplete="on"
              value={this.state.state}
              onChange={this.handleChange("state")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Country</InputLabel>
            <Input
              id="country"
              label="Country"
              type="text"
              autoComplete="on"
              value={this.state.country}
              onChange={this.handleChange("country")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Zipcode</InputLabel>
            <Input
              id="zipcode"
              label="Zipcode"
              type="text"
              autoComplete="on"
              value={this.state.zipcode}
              onChange={this.handleChange("zipcode")}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={classNames(classes.margin, "input-cntr")}
          >
            <InputLabel htmlFor="adornment-password">Location</InputLabel>
            <Input
              id="location"
              label="Location"
              type="text"
              autoComplete="on"
              value={this.state.location}
              onChange={this.handleChange("location")}
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
                  let {accesscode, firstname, lastname,title,phone,location,address1,address2,city,state,country,zipcode} = this.state;
                  this.props.myprofileAttempt({
                    accesscode,
                    firstname,
                    lastname,
                    title, phone, location, address1, address2, city, state, country, zipcode,
                    successCallBack: () => {
                      // console.debug("success");
                    },
                    failureCallback: () => {
                      // console.log("failed");
                    }
                  });
                }}
              >
                Save
              </Button>
            </FormControl>
          </div>
        </form>
      </div>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  myProfileAttempt: PropTypes.func,
  authMsg: PropTypes.string
};

export default withStyles(styles)(MyProfile);
