import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { useTheme } from "@material-ui/core/styles";

const TotalDonut = (props) => {
  const { sessions } = props;
  const theme = useTheme();
  const { background, primary, secondary } = theme.palette;

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

      labels: ["Successful", "Failed"],
      legend: { show: false, position: "bottom" },
      plotOptions: {
        pie: {
          customScale: 0.8,
        },
      },
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

TotalDonut.propTypes = {
  sessions: PropTypes.array,
};

export default TotalDonut;
