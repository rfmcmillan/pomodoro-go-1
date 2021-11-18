import React from 'react';
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
  let { goal, handleGoalChange } = props;
  const goalOptions = ['Read', 'Work', 'Meditate', 'Study'];

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
