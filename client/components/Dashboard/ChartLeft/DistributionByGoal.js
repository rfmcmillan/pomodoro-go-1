import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { useTheme } from '@material-ui/core/styles';

const DistributionByGoal = (props) => {
  const { sessions, stacked } = props;
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const sessionsSuccessful = sessions.filter((session) => {
    return session.successful === true;
  });

  const sessionsFailed = sessions.filter((session) => {
    return session.successful === false;
  });

  const sessionGoals = sessions.map((session) => {
    const goal = session.goal;
    return goal;
  });

  let distGoals = {};
  sessionGoals.forEach((goal) => {
    if (distGoals[goal]) distGoals[goal]++;
    else {
      distGoals[goal] = 1;
    }
  });

  let goalsArr = [];
  for (const [key, val] of Object.entries(distGoals)) {
    goalsArr.push(key);
  }
  let goalValsArr = [];
  for (const [key, val] of Object.entries(distGoals)) {
    goalValsArr.push(val);
  }

  const goalData = {
    series: [{ name: 'Sessions', data: goalValsArr }],
    categories: goalsArr,
  };

  //Goals - Stacked View

  const sessionGoalsSuccessful = sessionsSuccessful.map((session) => {
    const goal = session.goal;
    return goal;
  });

  let distGoalsSuccessful = {};
  sessionGoalsSuccessful.forEach((goal) => {
    if (distGoalsSuccessful[goal]) distGoalsSuccessful[goal]++;
    else {
      distGoalsSuccessful[goal] = 1;
    }
  });

  let goalsArrSuccessful = [];
  for (const [key, val] of Object.entries(distGoalsSuccessful)) {
    goalsArrSuccessful.push(key);
  }

  let goalValsArrSuccessful = [];
  for (const [key, val] of Object.entries(distGoalsSuccessful)) {
    goalValsArrSuccessful.push(val);
  }

  //Failed - Goals
  const sessionGoalsFailed = sessionsFailed.map((session) => {
    const goal = session.goal;
    return goal;
  });

  let distGoalsFailed = {};
  sessionGoalsFailed.forEach((goal) => {
    if (distGoalsFailed[goal]) distGoalsFailed[goal]++;
    else {
      distGoalsFailed[goal] = 1;
    }
  });

  let goalsArrFailed = [];
  for (const [key, val] of Object.entries(distGoalsFailed)) {
    goalsArrFailed.push(key);
  }

  let goalValsArrFailed = [];
  for (const [key, val] of Object.entries(distGoalsFailed)) {
    goalValsArrFailed.push(val);
  }

  const stackedDataGoals = {
    series: [
      {
        name: 'Failed',
        data: goalValsArrFailed,
      },
      {
        name: 'Successful',
        data: goalValsArrSuccessful,
      },
    ],
  };

  const goalChart = {
    options: {
      chart: {
        background: 'transparent',
        stacked: true,
        toolbar: {
          show: true,
        },
      },
      colors: stacked ? [secondary.main, primary.main] : [primary.main],
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      legend: {
        show: false,
      },

      stroke: {
        colors: ['#FFFFFF'],
        show: true,
        width: 2,
      },
      theme: {
        mode: theme.palette.mode,
      },
      tooltip: {
        mode: theme.palette.mode,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: goalData.categories,
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
    },
    series: stacked ? stackedDataGoals.series : goalData.series,
  };

  return <Chart type="bar" {...goalChart} />;
};

export default DistributionByGoal;
