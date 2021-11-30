import React, { useState } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
} from '@material-ui/core';
import SessionFrequency from './SessionFrequency';
import SessionHistory from './SessionHistory';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
    height: '97%',
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
});

/* This component displays either the Session History or Session Frequency charts
depending on what is selected from the dropdown menu */

const ChartRight = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { sessions } = props;
  const [rightChart, setRightChart] = useState('Frequency');

  const handleRightChartChange = (event) => {
    setRightChart(event.target.value);
  };

  return (
    <Paper className={classes.contain} {...props} elevation={10}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            className={classes.lsItem}
            variant="h5"
            color="textPrimary"
          >
            {rightChart === 'Frequency' ? 'Session Frequency' : ''}
            {rightChart === 'Session History' ? 'Session History' : ''}
          </Typography>
          <Typography
            className={classes.lsItem}
            variant="caption"
            color="textSecondary"
          >
            {rightChart === 'Frequency' ? 'Time of Week' : ''}
            {rightChart === 'Session History' ? 'Monthly' : ''}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="misc-label">Display</InputLabel>
            <Select
              labelId="misc-label"
              value={rightChart}
              onChange={handleRightChartChange}
            >
              <MenuItem value={'Frequency'}>Frequency</MenuItem>
              <MenuItem value={'Session History'}>Session History</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {rightChart === 'Frequency' ? (
        <SessionFrequency sessions={sessions} />
      ) : (
        ''
      )}
      {rightChart === 'Session History' ? (
        <SessionHistory sessions={sessions} />
      ) : (
        ''
      )}
    </Paper>
  );
};

export default ChartRight;
