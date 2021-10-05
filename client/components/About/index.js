import React from 'react';
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TypedText from './TypedText';
import TeamProfile from '../TeamProfile';
import Skills from './Skills';

const About = () => {
  const useStyles = makeStyles({
    button: { margin: 3, position: 'relative', left: 100 },
    root: { height: '80vh', width: '100vw' },
    text: {
      fontFamily: 'Nanum Pen Script',
      fontSize: '28px',
      textAlign: 'justify',
      padding: 12,
      width: 360,
      height: 170,
    },
    profile: {},
    paper: {
      position: 'relative',
      bottom: '25vh',
      right: '5vw',
    },
    title: { fontSize: 36, margin: 5 },
    hr: { color: 'black', backgroundColor: 'black', height: 1, width: '33vw' },
  });
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid>
        <Typography className={classes.title} variant="h1">
          Our Team
        </Typography>
      </Grid>
      <Grid item>
        <TeamProfile />
      </Grid>
      <Grid item>
        <Divider className={classes.hr} />
      </Grid>
      <Grid item>
        <Skills />
      </Grid>
    </Grid>
  );
};

export default About;
