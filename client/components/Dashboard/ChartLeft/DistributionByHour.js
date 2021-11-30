import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { useTheme } from '@material-ui/core/styles';

const DistributionByHour = (props) => {
  const { sessions, stacked } = props;
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const sessionHours = sessions.map((session) => {
    const hourOfDay = dayjs(session.startTime).format('H');
    return hourOfDay;
  });

  const sessionsSuccessful = sessions.filter((session) => {
    return session.successful === true;
  });

  const sessionsFailed = sessions.filter((session) => {
    return session.successful === false;
  });

  const distHours = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  };
  if (sessions.length) {
    for (let i = 0; i < sessionHours.length; i++) {
      distHours[sessionHours[i]]++;
    }
  }

  let hoursArr = [];
  for (const [key, val] of Object.entries(distHours)) {
    hoursArr.push(key);
  }

  let hourValsArr = [];
  for (const [key, val] of Object.entries(distHours)) {
    hourValsArr.push(val);
  }

  const hourData = {
    series: [{ name: 'Sessions', data: hourValsArr }],
    categories: hoursArr,
  };

  //Successful Sessions for Stacked Hours Distribution View

  const sessionHoursSuccessful = sessionsSuccessful.map((session) => {
    const hour = dayjs(session.startTime).format('H');
    return hour;
  });

  const distHoursSuccessful = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  };

  if (sessionsSuccessful.length) {
    for (let i = 0; i < sessionHoursSuccessful.length; i++) {
      distHoursSuccessful[sessionHoursSuccessful[i]]++;
    }
  }

  let hourValsArrSuccessful = [];
  for (const [key, val] of Object.entries(distHoursSuccessful)) {
    hourValsArrSuccessful.push(val);
  }

  //Failed Sessions for Stacked Distribution View

  const sessionHoursFailed = sessionsFailed.map((session) => {
    const hour = dayjs(session.startTime).format('H');
    return hour;
  });

  const distHoursFailed = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  };
  if (sessionsFailed.length) {
    for (let i = 0; i < sessionHoursFailed.length; i++) {
      distHoursFailed[sessionHoursFailed[i]]++;
    }
  }

  let hourValsArrFailed = [];
  for (const [key, val] of Object.entries(distHoursFailed)) {
    hourValsArrFailed.push(val);
  }

  const stackedDataHours = {
    series: [
      {
        name: 'Failed',
        data: hourValsArrFailed,
      },
      {
        name: 'Successful',
        data: hourValsArrSuccessful,
      },
    ],
  };

  const hourChart = {
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
        width: 1,
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

        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
        categories: [
          '12:00 AM',
          '1:00 AM',
          '2:00 AM',
          '3:00 AM',
          '4:00 AM',
          '5:00 AM',
          '6:00 AM',
          '7:00 AM',
          '8:00 AM',
          '9:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 PM',
          '1:00 PM',
          '2:00 PM',
          '3:00 PM',
          '4:00 PM',
          '5:00 PM',
          '6:00 PM',
          '7:00 PM',
          '8:00 PM',
          '9:00 PM',
          '10:00 PM',
          '11:00 PM',
        ],
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.secondary,
          },
          formatter: function (val, index) {
            return val.toFixed(0);
          },
        },
      },
    },
    series: stacked ? stackedDataHours.series : hourData.series,
  };

  return <Chart type="bar" {...hourChart} />;
};

export default DistributionByHour;
