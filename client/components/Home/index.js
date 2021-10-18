import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Fade,
  Box,
  Button,
  Tooltip,
} from '@material-ui/core';
import { Dashboard } from '../Dashboard';

const Home = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    button: {
      borderRadius: 30,
      backgroundColor: 'black',
      color: 'white',
      textTransform: 'capitalize',
      fontWeight: 100,
      marginTop: 30,
      boxShadow: '0px 10px 10px #d3aa93',
      height: 45,
      fontSize: 16,
    },
    description: { paddingRight: 100, paddingBottom: 300 },
    exploreButton: {
      borderRadius: 30,
      backgroundColor: 'black',
      color: 'white',
      textTransform: 'capitalize',
      fontWeight: 100,
      margin: '30px 0px 0px 20px',
      boxShadow: '0px 10px 10px #d3aa93',
      height: 45,
      fontSize: 16,
    },
    exploreTooltip: {},

    image: { width: '100%' },
    root: { width: '90%', height: '90vh' },
    subTitle: { fontSize: 20, fontWeight: 400 },
    title: { fontSize: 40, fontWeight: 700 },
  }));
  const classes = useStyles();

  return (
    <Fade easing="ease-in" timeout={1000} in={true}>
      <Grid container alignItems="center" direction="column">
        <Grid
          item
          container
          className={classes.root}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid className={classes.description} item xs={6}>
            <Typography variant="h1" className={classes.title}>
              Stay focused and track your productivity
            </Typography>
            <Typography variant="h2" className={classes.subTitle}>
              A pomodoro timer and website blocker for Chrome that gives you
              insights into your productivity
            </Typography>

            <Button
              className={classes.button}
              variant="contained"
              type="submit"
              href="https://chrome.google.com/webstore/detail/pomodorogo/hdkcidbbeignlpjolgfjelpkinmgkefd"
            >
              Download for Chrome
            </Button>

            <Tooltip
              className={classes.exploreTooltip}
              title="If you aren't able to download the extension on your work computer, but would still like to checkout the user interface this is a good option. The only thing that won't be activated is the website-blocker."
            >
              <Button
                className={classes.exploreButton}
                variant="contained"
                type="submit"
                href="https://pomodoro-go-1.herokuapp.com/sandboxLogin"
              >
                Explore User Interface
              </Button>
            </Tooltip>
          </Grid>
          <Grid className={classes.stack} item xs={6}>
            <img className={classes.image} src="./assets/Stackv3.png" />
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default Home;
