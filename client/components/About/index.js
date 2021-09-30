import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TypedText from './TypedText';
import TeamProfile from '../TeamProfile';
import Skills from './Skills';

const About = () => {
  const useStyles = makeStyles({
    button: { margin: 3, position: 'relative', left: 100 },
    root: { height: '80vh' },
    text: {
      fontFamily: 'Nanum Pen Script',
      fontSize: '28px',
      textAlign: 'justify',
      padding: 12,
      width: 360,
      height: 170,
    },
    profile: {},
    paper: { position: 'relative', bottom: '25vh' },
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
        className={classes.paper}
      >
        <Grid className="paper">
          <Grid className="lines">
            <Grid className="text" container>
              <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                className={classes.typed}
              >
                <Grid item className={classes.text}>
                  <TypedText />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/2101-Warriors/pomodoro-go"
                  >
                    Explore Repo
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className="holes hole-top"></div>
          <div className="holes hole-middle"></div>
          <div className="holes hole-bottom"></div>
        </Grid>
      </Grid>
      <Grid className={classes.profile} item xs={6}>
        <TeamProfile />
      </Grid>
      <Skills />
    </Grid>
  );
};

export default About;
