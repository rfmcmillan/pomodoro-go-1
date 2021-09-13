import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';

const BlocksDonut = (props) => {
  const { sortedBlackList } = props;
  const theme = useTheme();
  const backgroundPaper = theme.palette.background.paper;
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;
  const infoColor = theme.palette.info.main;

  const topFive = sortedBlackList.filter((entry, idx) => {
    return idx < 5;
  });
  const sites = topFive.map((entry) => entry.site.name);
  const blocks = topFive.map((entry) => entry.blocks);

  const chart = {
    options: {
      dataLabels: { enabled: false },
      colors: [
        primaryColor,
        secondaryColor,
        textSecondary,
        textPrimary,
        '#ccb8b8',
      ],
      labels: sites,
      legend: { show: false, position: 'bottom' },
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        show: true,
        colors: [backgroundPaper],
      },
    },

    series: blocks,
  };

  return (
    <div className="donut">
      {sortedBlackList.length ? (
        <Chart options={chart.options} series={chart.series} type="donut" />
      ) : (
        ''
      )}
    </div>
  );
};

export default BlocksDonut;
