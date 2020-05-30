import React, { Component } from "react";
//import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import { connect } from "react-redux";

import "./channelPrepare.css";

//import classNames from "classnames";
import LeftNav from "../../../components/LeftNav";

import CoachingGuide from "../../../components/CoachingGuide";

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

class channelPrepare extends Component {
  constructor(props) {
    super(props);
  this.state = {
    userid: "",
    token:"",
  };

  }

  render() {
      return (    
        <div className={"auth-form-cntr"}>
          <LeftNav />
          <CoachingGuide 
          ></CoachingGuide>          
        </div>
     );
      }
    }
channelPrepare.propTypes = {
  classes: PropTypes.object.isRequired,
  //getPrepareModulesAttempt: PropTypes.func,
  authMsg: PropTypes.string
};

const mapStateToProps = state => ({
  notification: state.notification,
  auth: state.auth
});

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       // getPrepareModulesAttempt,
//       // setErrMsg,
//       // resetLoginPage
//     },
//     dispatch
//   );
// }

export default withStyles(styles,  
  mapStateToProps,
 // matchDispatchToProps
)(channelPrepare);

// export default connect(
//   mapStateToProps,
//  // matchDispatchToProps
// )(channelPrepare);