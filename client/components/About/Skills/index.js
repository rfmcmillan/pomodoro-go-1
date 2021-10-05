import React from 'react';
import { skillsData } from './skillsData.js';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SkillItem from './SkillItem';

const SkillSet = ({ data }) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {},
    container: { width: '40%', margin: 'auto' },
  });
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.container} container wrap="wrap" spacing={3}>
        {data.items.map((skill, index) => (
          <Grid item xs={2}>
            <SkillItem skill={skill} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Skills = () => {
  const useStyles = makeStyles({
    root: { textAlign: 'center' },
    header: { fontSize: 30 },
    container: { width: '66%', margin: 'auto' },
  });
  const classes = useStyles();
  return (
    <section>
      <div className={classes.root}>
        <Typography className={classes.header} variant="h2">
          Technologies Used
        </Typography>
        <Typography variant="body1">
          A variety of frameworks, libraries and languages that we used to build
          this project.
        </Typography>
      </div>
      <ul>
        {skillsData.map((skillSet, index) => (
          <SkillSet data={skillSet} key={index} />
        ))}
      </ul>
    </section>
  );
};

export default Skills;
