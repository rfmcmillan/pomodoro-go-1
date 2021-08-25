import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { authenticate } from '../../store';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
    width: '20vw',
    position: 'fixed',
    right: '39vw',
    top: '30vh',
  },
  item: {
    width: 200,
    margin: 4,
  },
}));

const SandboxLogin = (props) => {
  console.log('props:', props);
  const { name, displayName, error, value } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const loginToSandbox = (ev) => {
    ev.preventDefault();
    dispatch(authenticate('cody@mail.com', 'cody@mail.com', '123', 'login'));
  };

  return (
    <div>
      <form
        id="sandboxLogin"
        onSubmit={loginToSandbox}
        name={name}
        value={value}
      >
        <Paper className={classes.login}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h6">Log In</Typography>
            <Typography align="center" gutterBottom={true}>
              {' '}
              To use our sandbox account, simply click the button below:
            </Typography>
            <Button
              onClick={loginToSandbox}
              id="submit"
              variant="contained"
              type="submit"
              value={value}
              color="primary"
              style={{
                backgroundColor: '#5061a9',
                color: 'white',
                marginTop: '10px',
              }}
              className={classes.item}
            >
              Login To Sandbox
            </Button>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

const mapSandboxLogin = (state) => {
  return {
    name: 'sandboxLogin',
    displayName: 'Log In To Sandbox',
    error: state.auth.error,
  };
};

export default connect(mapSandboxLogin)(SandboxLogin);
