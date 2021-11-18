import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControlSelect: {
    minWidth: 100,
    marginRight: 10,
  },
}));

const GoalSelect = (props) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  let blackList = useSelector((state) => state.blackList);
  let blocks = useSelector((state) => state.blocks);
  let { sessions, goal, setGoal } = props;

  if (auth) {
    sessions = sessions.filter((session) => session.userId === auth.id);
    blackList = blackList.filter((entry) => entry.userId === auth.id);
    blocks = blocks.filter((block) => block.userId === auth.id);
  }
  let goals = sessions.map((session) => {
    return session.goal;
  });

  const goalOptions = [];
  for (let i = 0; i < goals.length; i++) {
    if (!goalOptions.includes(goals[i])) {
      goalOptions.push(goals[i]);
    }
  }

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  if (goal !== 'All' && goal) {
    sessions = sessions.filter((session) => {
      return session.goal === goal;
    });
  }

  let capitalized = '';

  for (let i = 0; i < auth.username.length; i++) {
    const char = auth.username[i];
    if (i === 0) {
      capitalized += char.toUpperCase();
    } else capitalized += char;
  }

  return (
    <Grid>
      <FormControl className={classes.formControlSelect}>
        <InputLabel id="goal-label">Goal</InputLabel>
        <Select labelId="goal-label" value={goal} onChange={handleGoalChange}>
          <MenuItem value={'All'}>All</MenuItem>
          {goalOptions.map((goal, idx) => {
            return (
              <MenuItem key={idx} value={goal}>
                {goal}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default GoalSelect;
