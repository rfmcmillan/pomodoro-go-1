import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import CreateSession from './CreateSession';

export const Timer = (props) => {
  const { timer } = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <CreateSession timer={timer} />
    </Grid>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Timer);
