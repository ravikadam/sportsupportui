import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//import classNames from "classnames";
import {
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { getPrepareModulesAttempt, getModuleDetails } from "../../containers/application/redux_actions";
import "./CoachingGuide.css";
// import CoachingGuideDetails from "../CoachingGuideDetails";
// import CoachingGuideImprove from "../CoachingGuideImprove";

const styles = {};
// const value="";
const img = require('../images/Union 10.png');

class CoachingGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      token: "",
      activeTabIndex: 1,
      moduleid: "5ea989d3761c9d61dc297094",
      modobj: [],
    };

    // this.setState ({availableModule: 
    //   {moduleid:"5ea989d3761c9d61dc297094",
    //   moduleTitle:"Adapt to the environment: Building Resillience"}
    // });

    this.handleChange = (event, value) => {
      this.setState({ activeTabIndex: value });
    };
  }

  componentDidMount() {
      this.state.userid = this.props.auth.user_uid;
      this.state.token = this.props.auth.user_token;
      let { userid,token} = this.state;
       
      const id = this.state.moduleid;

          fetch("http://localhost:3000/v1/appmodule/" + id, {
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "Authorization": "bearer " + token,
              "accept": "application/json"
            },
          })
          .then(response => response.json())
          .then(data => {
            this.setState({ modobj: data});
            this.setState({ moduleObj: data});
          })
        }

  render() {
    const { classes } = this.props;
    const { activeTabIndex } = this.state;
    const { modobj } = this.state;
    // console.log(modobj);

return (  
      <div className="wrapper">
        <div className="headerTitle">
<p>Prepare Zone - {modobj.title}</p>
        </div>
        <div className="jumpTo">
        <div className={classes.demo1}>
       <Tabs value={activeTabIndex} onChange={this.handleChange} aria-label="ant example">
        <Tab label="Coaching Guide" onClick={this.valChange} value={1}  />
        <Tab label="Improve Engagement" onClick={this.valChange} value={2} />
      </Tabs>
      {
          activeTabIndex === 1 &&
          // When the user clicks on Test One or Test Two, update the state
          // to display Tab 2
          //this.setState({ moduleObj: modobj}),
          <div onClick={() => this.setState({ activeTabIndex: 1 },{moduleObj: modobj})}>
            {/* <CoachingGuideDetails></CoachingGuideDetails> */}

            <div className={"menu h-100"}>      
            <form className={"h-100"}>
              <div className={"h-100"}>
              <img src={img} alt="logo" className="Union-10" />  Module Preview
              </div>

              <div className={"title"}>
                {modobj.title}
              </div>
              <div className={"Estimated-time-0345-min"}>
                Estimated Time: 03:45 min
              </div>

              <div className={"frontSummary"}>
              {modobj.frontSummary}
              </div>
            
              <div className={"Roadmap"}>Roadmap</div>

              <div className={"Roadmap"}>
              01 : Why should I Contribute?
              </div>
              <div className={"Why-should-I-Contribute"}>
              {modobj.whyContribute}
              </div>

            </form>
          </div>
          </div>
        }
        {
          activeTabIndex === 2 &&
          //this.setState({ moduleObj: modobj}),
          <div onClick={() => this.setState({ activeTabIndex: 2 },{moduleObj: modobj})}>
           {/* <CoachingGuideImprove></CoachingGuideImprove> */}

           <div className={"menu h-100"}>      
        <form className={"h-100"}>
          <div className={"h-100"}>
            Here are some best practices and idea units that are curated for you to help you improve your coaching engagement
            <div>
              <div className={"LeftSelection"}>
              Best Practices
              </div>
              <div className={"LeftSelection"}>
              Clarify the Idea
              </div>
            </div>
            <div>
              <div className={"Best-Practices"}>Best Practices</div>              
            </div>
          </div>
        </form>
      </div>
          </div>
        }
      <Typography className={classes.padding} />
    </div>
   
        </div>

        <form>
          <div className="loginform-cntr">
            <Typography
              className="errorMsg"
              variant="caption"
              gutterBottom
              align="center"
              color="secondary"
            >
              {this.props.authMsg}
            </Typography>
          </div>
        </form>
      </div>
    );
  }
}

CoachingGuide.propTypes = {
  classes: PropTypes.object.isRequired,
  getPrepareModulesAttempt: PropTypes.func.isRequired,
  getModuleDetails: PropTypes.func.isRequired,
  authMsg: PropTypes.string
};

let coachingGuide = withStyles(styles)(CoachingGuide);

const mapStateToProps = state => ({
  auth: state.auth,
  availableModule: state.availableModule
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
     getPrepareModulesAttempt,
     getModuleDetails,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(coachingGuide);
