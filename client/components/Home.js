import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import CreateSession from './Timer/CreateSession';

export const Home = (props) => {
  return (
    <div id="main">
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item>
          <CreateSession />
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
