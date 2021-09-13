import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import MostBlocked from './MostBlocked';
import ChartLeft from './ChartLeft';
import ChartRight from './ChartRight';

const useStyles = makeStyles((theme) => ({
  contain: {
    minWidth: 100,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
  formControlCheckboxes: {},
  formControlSelect: {
    minWidth: 100,
    marginRight: 10,
  },
  dashboardContain: {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  formControlLabel: {
    color: theme.palette.text.primary,
  },
  greeting: {
    marginBottom: 5,
  },
  charts: { justifyContent: 'space-around' },
}));

const Dashboard = () => {
  const classes = useStyles();
  let sessions = useSelector((state) => state.sessions);
  const auth = useSelector((state) => state.auth);
  let blackList = useSelector((state) => state.blackList);
  let blocks = useSelector((state) => state.blocks);
  const sites = useSelector((state) => state.sites);
  const theme = useTheme();

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

  const [timeFrame, setTimeFrame] = useState('');
  const [goal, setGoal] = useState('');
  const [state, setState] = useState({
    lastSession: true,
    totalSessions: true,
    averageSession: true,
    sessionDistribution: true,
    sessionFrequency: true,
    mostBlocked: true,
  });

  const {
    lastSession,
    totalSessions,
    averageSession,
    sessionDistribution,
    sessionFrequency,
    mostBlocked,
  } = state;

  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };
  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  if (timeFrame === 'Year') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 365;
    });
    sessions = filtered;
  }
  if (timeFrame === 'Quarter') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 90;
    });
    sessions = filtered;
  } else if (timeFrame === 'Month') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 30;
    });
    sessions = filtered;
  } else if (timeFrame === 'Week') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 7;
    });
    sessions = filtered;
  }
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
    <div className={classes.dashboardContain}>
      <Grid
        className={classes.greeting}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Typography variant="overline" color="textPrimary">
            Dashboard
          </Typography>
          <Typography variant="h6" color="textPrimary">
            Good Afternoon{capitalized ? `, ${capitalized}` : ''}
            <br />
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            Here is your latest data.
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={9}
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Grid item container xs={2} justifyContent="flex-end">
            <Grid>
              <FormControl className={classes.formControlSelect}>
                <InputLabel id="time-frame-label" color="primary">
                  Period
                </InputLabel>
                <Select
                  color="primary"
                  labelId="time-frame-label"
                  value={timeFrame}
                  onChange={handleTimeFrameChange}
                >
                  <MenuItem value={'All'}>All</MenuItem>
                  <MenuItem value={'Week'}>Week</MenuItem>
                  <MenuItem value={'Month'}>Month</MenuItem>
                  <MenuItem value={'Quarter'}>Quarter</MenuItem>
                  <MenuItem value={'Year'}>Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.formControlSelect}>
                <InputLabel id="goal-label">Goal</InputLabel>
                <Select
                  labelId="goal-label"
                  value={goal}
                  onChange={handleGoalChange}
                >
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
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item container spacing={3}>
          <Grid item xs={3}>
            {lastSession ? <LastSession sessions={sessions} /> : ''}
          </Grid>
          <Grid item xs={3}>
            {totalSessions ? <TotalSessions sessions={sessions} /> : ''}
          </Grid>
          <Grid item xs={3}>
            {averageSession ? <AverageSession sessions={sessions} /> : ''}
          </Grid>
          <Grid item xs={3}>
            {mostBlocked ? (
              <MostBlocked sessions={sessions} blackList={blackList} />
            ) : (
              ''
            )}
          </Grid>
        </Grid>

        <Grid className={classes.charts} item container spacing={3}>
          <Grid item xs={6}>
            {sessionDistribution ? <ChartLeft sessions={sessions} /> : ''}
          </Grid>
          <Grid item xs={6}>
            {sessionFrequency ? (
              <ChartRight blocks={blocks} sessions={sessions} sites={sites} />
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
