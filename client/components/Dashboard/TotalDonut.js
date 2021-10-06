import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';

const TotalDonut = (props) => {
  const { sessions } = props;
  const theme = useTheme();
  const { background, primary, secondary } = theme.palette;

  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  let total;
  if (sessions.length) {
    total = sessions.length;
  }

  let totalSuccessful = [];
  let totalFailed = [];

  if (sessions.length) {
    totalSuccessful = sessions.filter((session) => {
      return session.successful === true;
    });
    totalFailed = sessions.filter((session) => {
      return session.successful === false;
    });
  }

  const chart = {
    options: {
      colors: [primary.main, secondary.main],
      dataLabels: { enabled: false },

      labels: ['Successful', 'Failed'],
      legend: { show: false, position: 'bottom' },
      plotOptions: {
        pie: {
          customScale: 0.8,
          // offsetY: -50,
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 10000,
      //     options: {
      //       plotOptions: {
      //         pie: {
      //           customScale: 1,
      //         },
      //       },
      //     },
      //   },
      // ],
      stroke: {
        show: true,
        colors: [background.paper],
      },
      chart: {
        toolbar: {
          show: false,
        },
        height: 50,
      },
    },
    series: [totalSuccessful.length, totalFailed.length],
  };

  return (
    <div className="donut">
      <Chart options={chart.options} series={chart.series} type="donut" />
    </div>
  );
};

export default TotalDonut;
