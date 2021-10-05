import React from 'react';
import { Button, Grid, Typography, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TypedText from './TypedText';
import TeamProfile from '../TeamProfile';
import Skills from './Skills';

const About = () => {
  const useStyles = makeStyles({
    body: { color: '#666666' },
    button: { margin: 3, position: 'relative', left: 100 },
    header: {
      fontSize: 14,
      color: '#555555',
      textAlign: 'center',
      fontWeight: 500,
      marginBottom: 5,
    },
    hr: { color: 'black', backgroundColor: 'black', height: 1, width: '33vw' },
    profile: { margin: '30px 0px 30px 0px' },
    paper: {
      position: 'relative',
      bottom: '25vh',
      right: '5vw',
    },
    root: { width: '100vw', marginTop: 45 },
    subTitle: {
      color: '#333333',
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 6,
    },
    text: {
      fontFamily: 'Nanum Pen Script',
      fontSize: '28px',
      textAlign: 'justify',
      padding: 12,
      width: 360,
      height: 170,
    },
    teamPaper: { margin: 10, padding: 14 },
    techPaper: {
      width: 1200,
      margin: 10,
      padding: 14,
    },
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
      <Paper className={classes.teamPaper}>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Typography className={classes.header} variant="h2">
              OUR TEAM
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subTitle} variant="h3">
              Small Team. Big Dreams.
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.body} variant="body1">
              Our goal is to help you focus and understand how you have been
              spending your time.
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.profile}>
          <TeamProfile />
        </Grid>
      </Paper>
      <Paper className={classes.techPaper}>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Typography className={classes.header} variant="h1">
              TECHNOLOGIES
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subTitle} variant="h3">
              Node. Express. React. Postgres...
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.body} variant="body1">
              ... and a variety of other frameworks, libraries and languages
              that we used to build this project.
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Skills />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default About;
