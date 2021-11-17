import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useTheme } from '@material-ui/core/styles';

const SessionHistory = (props) => {
  const theme = useTheme();
  const { sessions } = props;
  const { primary, error } = theme.palette;

  let seriesMonths = {
    Jan: { successful: 0, failed: 0 },
    Feb: { successful: 0, failed: 0 },
    Mar: { successful: 0, failed: 0 },
    Apr: { successful: 0, failed: 0 },
    May: { successful: 0, failed: 0 },
    Jun: { successful: 0, failed: 0 },
    Jul: { successful: 0, failed: 0 },
    Aug: { successful: 0, failed: 0 },
    Sep: { successful: 0, failed: 0 },
    Oct: { successful: 0, failed: 0 },
    Nov: { successful: 0, failed: 0 },
    Dec: { successful: 0, failed: 0 },
  };

  const filtered = sessions.filter((session) => {
    return session.startTime !== null;
  });
  filtered.forEach((session) => {
    const { startTime, successful } = session;
    const month = dayjs(startTime).format('MMM');
    if (successful === true) {
      seriesMonths[month].successful++;
    } else {
      seriesMonths[month].failed++;
    }
  });

  let monthsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthsArr.push(key);
  }
  let monthValsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthValsArr.push(val);
  }

  const monthData = {
    series: [
      {
        name: 'Successful',
        data: monthValsArr.map((val) => {
          return val.successful;
        }),
      },
      {
        name: 'Failed',
        data: monthValsArr.map((val) => {
          return val.failed;
        }),
      },
    ],
    categories: monthsArr,
  };

  const options = {
    colors: [primary.main, error.main],
    chart: {
      id: 'basic-line',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: function (val, index) {
          return val.toFixed(0);
        },
      },
    },
  };
  const series = monthData.series;

  return <Chart type="line" options={options} series={series} />;
};

export default SessionHistory;
