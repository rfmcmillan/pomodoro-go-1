import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { useTheme } from '@material-ui/core/styles';

const DistributionByDay = (props) => {
  const { sessions, stacked } = props;
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const sessionDays = sessions.map((session) => {
    const dayOfWeek = dayjs(session.startTime).format('ddd');
    return dayOfWeek;
  });

  const distDays = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
  if (sessions.length) {
    for (let i = 0; i < sessionDays.length; i++) {
      if (sessionDays[i] !== 'Invalid Date') {
        distDays[sessionDays[i]]++;
      }
    }
  }

  let daysArr = [];
  for (const [key, val] of Object.entries(distDays)) {
    daysArr.push(key);
  }

  let valsArr = [];
  for (const [key, val] of Object.entries(distDays)) {
    valsArr.push(val);
  }

  const data = {
    series: [{ name: 'Sessions', data: valsArr }],
    categories: daysArr,
  };

  //Successful Sessions for Stacked Distribution View

  const sessionsSuccessful = sessions.filter((session) => {
    return session.successful === true;
  });
  const sessionDaysSuccessful = sessionsSuccessful.map((session) => {
    const dayOfWeek = dayjs(session.startTime).format('ddd');
    return dayOfWeek;
  });

  const distDaysSuccessful = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };
  if (sessionsSuccessful.length) {
    for (let i = 0; i < sessionDaysSuccessful.length; i++) {
      distDaysSuccessful[sessionDaysSuccessful[i]]++;
    }
  }

  let valsArrSuccessful = [];
  for (const [key, val] of Object.entries(distDaysSuccessful)) {
    valsArrSuccessful.push(val);
  }

  //Failed Sessions for Stacked Distribution View

  const sessionsFailed = sessions.filter((session) => {
    return session.successful === false;
  });
  const sessionDaysFailed = sessionsFailed.map((session) => {
    const dayOfWeek = dayjs(session.startTime).format('ddd');
    return dayOfWeek;
  });

  const distDaysFailed = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };
  if (sessionsFailed.length) {
    for (let i = 0; i < sessionDaysFailed.length; i++) {
      distDaysFailed[sessionDaysFailed[i]]++;
    }
  }

  let valsArrFailed = [];
  for (const [key, val] of Object.entries(distDaysFailed)) {
    valsArrFailed.push(val);
  }

  const stackedData = {
    series: [
      {
        name: 'Failed',
        data: valsArrFailed,
      },
      {
        name: 'Successful',
        data: valsArrSuccessful,
      },
    ],
  };

  const chart = {
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
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: data.categories,
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
    series: stacked ? stackedData.series : data.series,
  };

  return <Chart type="bar" {...chart} />;
};

export default DistributionByDay;
