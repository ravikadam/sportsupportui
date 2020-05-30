import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

let loginLink = props => <Link to="./auth/login" {...props} />
let registerLink = props => <Link to="./auth/register" {...props} />
let myprofileLink = props => <Link to="./auth/myprofile" {...props} />
let prepareLink = props => <Link to="./application/Prepare" {...props} />

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

let Public = class Public extends Component{
  render(){
    const { classes } = this.props;
    return <div>
      <p>This is the space for public content.</p>
      <p>Use this space for the marketing purpose.</p>
      <br /><br />
      <p>here are the login and register buttons<br /><br /></p>
      <div>
        <Button variant="outlined" component={loginLink} className={classes.button}>Sign In</Button>
        <Button variant="outlined" component={registerLink} className={classes.button}>Register</Button>
        <Button variant="outlined" component={myprofileLink} className={classes.button}>MyProfile</Button>
        <Button variant="outlined" component={prepareLink} className={classes.button}>Prepare</Button>

      </div>
    </div>
  }
}

export default withStyles(styles)(Public)