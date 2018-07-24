import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "red",
  },
  dashboard: {
    // backgroundColor: "red",
    // height: "400px"
    // marginTop: "200px",
    // marginBottom: "-30px"
  },
  dashboardTwo: {
    backgroundColor: "yellow",
    // height: "400px"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  totalScore: {
    // marginTop: "300px",
    // marginBottom: "50px"
  }
});

class App extends Component {

  componentDidMount() {
    fetch('/api/hello')
      .then(response => response.json())
      .then(json => console.log(json))
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root}>
          <Grid container spacing={24} className={classes.dashboard} justify="center">
            <Grid item xs={10} className={classes.totalScore}>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item xs={10}>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
          </Grid>         
        </Grid>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
