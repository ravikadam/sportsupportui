import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./channelDashboard.css";

import LeftNav from "../../../components/LeftNav";

//import TopFilter from "../../../components/TopFilter";
import PrepareForms from "../../../components/PrepareForms";

class channelDashboard extends Component {
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
          {/* <TopFilter /> */}
          <PrepareForms 
          ></PrepareForms>          
        </div>
     );
      }
    }
channelDashboard.propTypes = {
  //classes: PropTypes.object.isRequired,
  //getPrepareModulesAttempt: PropTypes.func,
  authMsg: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(channelDashboard);