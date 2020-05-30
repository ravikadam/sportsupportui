import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//import classNames from "classnames";
import {
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { getPrepareModulesAttempt, getModuleDetails } from "../../containers/application/redux_actions";
import "./PrepareForms.css";

const styles = {};
class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      token: "",
      availableModule: [],
      chk: 0,
    };

    // this.setState({ 
    //   userid : this.props.auth.user_uid,
    // });
    // this.setState({
    //   token: this.props.auth.user_token,
    // });


    this.handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };
  }
  
  async componentDidMount(){
        this.state.userid = this.props.auth.user_uid;
      this.state.token = this.props.auth.user_token;
      let { userid,token} = this.state;

      const { getPrepareModulesAttempt } = this.props;
      
      await getPrepareModulesAttempt({userid, token})
            .then(result => {
                // The checkClient call is now done!
                console.log(`success: ${result}`);
                console.log(result);
                this.setState({chk: 1});
            })
    }

  render() {
     if(this.state.chk === 0) {
      console.log('Not loaded');
      return (
        <div>Loading...</div>
      )
    } 
    else
    {
    console.log('Loaded');

    const toCoachingGuide = props => <Link to="../application/prepare" {...props} />;
    const { classes } = this.props;
    let {availableModuleAvl, availableModulePre, availableModuleSC, availableModuleSCD} = this.props.app;
    console.log(availableModuleAvl);
    console.log(availableModuleAvl.length);
      return (  
      <div className="wrapper">
        <div className="headerTitle">
          <p>Prepare Zone</p>
          <h1> What do you want to take up today?</h1>
        </div>

        <div className="jumpTo">
          <p>Jump To</p>
          <p>Continue Preparation ({availableModulePre.length})</p>
          <p>Ready to Self Certify ({availableModuleSC.length})</p>
          <p>Available to Prepare ({availableModuleAvl.length})</p>
          <p>Self Certified ({availableModuleSCD.length})</p>
        </div>
  
        <section>
          <h2 className="mb-15">Continue Preparation</h2>
          <div className="grid-wrapper">
          <div className="users">
            {availableModuleAvl.map((user) => (
              <div className="card">
              <div key={user._Id} className="card-body">
                <p>{user.title}</p>
                <h2>{user.frontSummary}</h2>
                <div className="cFoot">
                  <p>Progress Bar</p>
                  <p>
                  <Button className={classes.button}>
                <Typography
                  className="errorMsg"
                  variant="caption"
                  gutterBottom
                  color="primary"
                  component={toCoachingGuide}
                >
                  Prepare
                </Typography>
              </Button>
                  </p>
                </div>
              </div>
            </div> 
            ))}
          </div>
          </div>
        </section> 
  
        <section>
          <h2 className="mb-15">Continue Preparation</h2>
          <div className="grid-wrapper">
            <div className="card">
              <div className="card-body">
                <p>Human Excellence</p>
                <h2>Lorem doller emmet</h2>
                <div className="cFoot">
                  <p>Progress Bar</p>
                  <p>
                  <Button className={classes.button}>
                <Typography
                  className="errorMsg"
                  variant="caption"
                  gutterBottom
                  color="primary"
                  component={toCoachingGuide}
                >
                  Prepare
                </Typography>
              </Button>
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>Human Excellence</p>
                <h2>Lorem doller emmet</h2>
                <div className="cFoot">
                  <p>**********</p>
                  <p>Prepare</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>Human Excellence</p>
                <h2>Lorem doller emmet</h2>
                <div className="cFoot">
                  <p>**********</p>
                  <p>Prepare</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-15">Continue Preparation</h2>
          <div className="grid-wrapper">
            <div className="card">
              <div className="card-body">
                <p>Human Excellence</p>
                <h2>Lorem doller emmet</h2>
                <div className="cFoot">
                  <p>**********</p>
                  <p>Prepare</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>Human Excellence</p>
                <h2>Lorem doller emmet</h2>
                <div className="cFoot">
                  <p>**********</p>
                  <p>Prepare</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>Human Excellence</p>
                <h2>Lorem doller emmet</h2>
                <div className="cFoot">
                  <p>**********</p>
                  <p>Prepare</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
}

Prepare.propTypes = {
  classes: PropTypes.object.isRequired,
  availableModuleAvl: PropTypes.object,
  availableModulePre: PropTypes.object,
  availableModuleSC: PropTypes.object,
  availableModuleSCD: PropTypes.object,
  getPrepareModulesAttempt: PropTypes.func.isRequired,
  getModuleDetails: PropTypes.func.isRequired,
  authMsg: PropTypes.string
};

let prepare = withStyles(styles)(Prepare);

const mapStateToProps = state => ({
  auth: state.auth,
  app: state.app,
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
  matchDispatchToProps,
)(prepare);
