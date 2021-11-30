import React, { useState } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import DistributionByDay from './DistributionByDay';
import DistributionByHour from './DistributionByHour';
import DistributionByGoal from './DistributionByGoal';

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
  formControl: {
    minWidth: 100,
  },
});

/* This component displays either the 'By Day of Week' bar chart or the 'By Goal'
bar chart depending on what is selected from the dropdown menu */

const ChartLeft = (props) => {
  const classes = useStyles();
  const { sessions } = props;
  const [distribution, setDistribution] = useState('Day of Week');
  const [stacked, setStacked] = useState(false);
  const theme = useTheme();

  const handleDistributionChange = (event) => {
    setDistribution(event.target.value);
  };

  const handleStackedChange = (event) => {
    setStacked(event.target.checked);
  };

  return (
    <Paper className={classes.contain} {...props} elevation={10}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={8}>
          <Typography
            className={classes.lsItem}
            variant="h5"
            color="textPrimary"
          >
            Session Distribution
          </Typography>
          <Typography
            className={classes.lsItem}
            variant="caption"
            color="textSecondary"
          >
            Sessions by {distribution}
          </Typography>
        </Grid>
        <Grid container item xs={4} justifyContent="center">
          <Grid item xs={6}>
            <FormControlLabel
              style={{ color: theme.palette.text.primary }}
              control={
                <Checkbox
                  color="primary"
                  checked={stacked}
                  onChange={handleStackedChange}
                  name="stacked"
                />
              }
              label="Stacked View"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="distribution-label">Display</InputLabel>
              <Select
                labelId="distribution-label"
                value={distribution}
                onChange={handleDistributionChange}
              >
                <MenuItem value={'Day of Week'}>Day of Week</MenuItem>
                <MenuItem value={'Hour of Day'}>Hour of Day</MenuItem>
                <MenuItem value={'Goal'}>Goal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {distribution === 'Day of Week' ? (
        <DistributionByDay sessions={sessions} stacked={stacked} />
      ) : (
        ''
      )}
      {distribution === 'Hour of Day' ? (
        <DistributionByHour sessions={sessions} stacked={stacked} />
      ) : (
        ''
      )}
      {distribution === 'Goal' ? (
        <DistributionByGoal sessions={sessions} stacked={stacked} />
      ) : (
        ''
      )}
    </Paper>
  );
};

export default ChartLeft;
