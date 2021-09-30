import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, Box } from '@material-ui/core';

const SkillItem = ({ skill }) => {
  let { logo, title } = skill;
  const theme = useTheme();
  const useStyles = makeStyles({
    root: { width: 150 },
    image: {
      width: 30,
    },
  });

  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <img
        className={classes.image}
        src={logo ? logo : ''}
        alt={logo ? `${title} logo` : ''}
      />
      <Box display="inline" fontFamily={theme.typography.fontFamily}>
        {title}
      </Box>
    </Paper>
  );
};

export default SkillItem;
