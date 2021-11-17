import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useTheme } from '@material-ui/core/styles';

const SessionFrequency = (props) => {
  const theme = useTheme();
  const { sessions } = props;
  const { primary, background } = theme.palette;

  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  const distHours = [
    {
      name: '0',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '1',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '2',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '3',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '4',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '5',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '6',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '7',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '8',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '9',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '10',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '11',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '12',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '13',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '14',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '15',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '16',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '17',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '18',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '19',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '20',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '21',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '22',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '23',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
  ];

  if (sessions.length) {
    const filtered = sessions.filter((session) => {
      return session.startTime !== null;
    });
    for (let i = 0; i < filtered.length; i++) {
      const currentSession = filtered[i];
      const dayOfWeek = dayjs(currentSession.startTime).format('ddd');
      const time = dayjs(currentSession.startTime).format('H');
      const timeSlot = distHours[time];
      const slotData = timeSlot.data;
      for (let j = 0; j < slotData.length; j++) {
        if (slotData[j].x === dayOfWeek) slotData[j].y++;
      }
    }
  }

  const chart = {
    options: {
      legend: {
        show: false,
      },
      chart: {
        background: 'transparent',
        toolbar: {
          show: true,
        },
      },
      colors: [primary.main],
      dataLabels: {
        enabled: false,
      },

      grid: {
        position: 'front',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          show: true,
          lines: {
            show: true,
          },
        },
      },
      plotOptions: {
        heatmap: {
          enableShades: true,
          shadeIntensity: 1,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: background.paper,
              },
            ],
          },
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: [background.paper],
        width: 0.5,
        dashArray: 0,
      },
      tooltip: {
        enabled: true,

        y: {
          title: {
            formatter: function (val, index) {
              if (val) {
                return `${val}:00`;
              }
            },
          },
          formatter: function (val, index) {
            if (val) {
              if (val === 0) {
                return ' 0 sessions';
              }
              if (val === 1) {
                return ' 1 session';
              } else {
                return ` ${val} sessions`;
              }
            }
          },
        },
        z: {
          formatter: undefined,
        },
      },
      xaxis: {
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
            if (val) {
              return `${val}:00`;
            }
          },
        },
      },
    },
    series: distHours,
  };

  return <Chart type="heatmap" {...chart} />;
};

export default SessionFrequency;
