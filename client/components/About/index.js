import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TypedText from './TypedText';
import TeamProfile from '../TeamProfile';
import DialogChoice from './DialogChoice';

const About = () => {
  const useStyles = makeStyles({
    button: { margin: 3 },
    root: {},
    text: {
      fontFamily: 'Nanum Pen Script',
      fontSize: '28px',
      textAlign: 'justify',
      padding: 12,
      width: 400,
    },
  });
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      direction="row"
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        xs={6}
      >
        <DialogChoice />
        <Grid item className={classes.text}>
          <TypedText />
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            href="https://github.com/2101-Warriors/pomodoro-go"
          >
            Explore Repo
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <TeamProfile />
      </Grid>
    </Grid>
  );
};

export default About;
