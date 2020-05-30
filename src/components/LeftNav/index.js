import React from "react";
import PropTypes from "prop-types";
// import {
//   // Typography,
// } from "@material-ui/core";
//import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

import "./LeftNav.css";
const styles = {};
const logo = require('../images/IllumineLogo103x122.png');
const grp = require('../images/Group 2225.png');
const grp1 = require('../images/Group 2231.png');
const grp2 = require('../images/Group 2226.png');
const grp3 = require('../images/Group 2227.png');
const grp4 = require('../images/Group 2229.png');

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    accesscode: "",
  };
  }

  routeChange() {
    let path = `/application`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div className={"menu h-100"}>      
        <form className={"h-100"}>
          <div className={"h-100"}>
          <ul className={"h-100"}>
            <li> 
              <a href="google.com">
                <img src={logo} alt="logo" className="IllumineLogo103x122" />
              </a> 
            </li>
            <li>
            <a href="google.com">
              <img src={grp} alt="grp" className="Group-2225" />
              </a>
            </li>
            <li>
            <a href="google.com">
              <img src={grp1} alt="grp1" className="Group-2231" />
              </a>
            </li>
            <li>
            <a href="google.com">
              <img src={grp2} alt="grp2" className="Group-2226" />
              </a>
            </li>
            <li>
            <a href="google.com">
              <img src={grp3} alt="grp3" className="Group-2227" />
              </a>
            </li>
            <li>
            <a href="google.com">
              <img src={grp4} alt="grp4" className="Group-2229" />
            </a>
            </li>
          </ul>
          </div>
        </form>
      </div>
    );
  }
}

LeftNav.propTypes = {
  classes: PropTypes.object.isRequired,
  authMsg: PropTypes.string
};

export default withStyles(styles)(LeftNav);
