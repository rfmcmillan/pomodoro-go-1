import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, Box, Grid } from '@material-ui/core';

const SkillItem = ({ skill }) => {
  let { logo, title } = skill;
  const theme = useTheme();
  const useStyles = makeStyles({
    root: { width: 150, height: 30 },
    image: {
      width: 30,
    },
    title: {
      marginLeft: 6,
    },
  });

  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <img
          className={classes.image}
          src={logo ? logo : ''}
          alt={logo ? `${title} logo` : ''}
        />
      </Grid>
      <Grid item>
        <Box
          className={classes.title}
          display="inline"
          fontFamily={theme.typography.fontFamily}
        >
          {title}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SkillItem;
