// MaterialUI
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
// Components
import ReactApexChart from 'react-apexcharts';
import { access } from 'fs';
//============================================================================//

function ChartLine() {
  const auValues = [1400, 1500, 1600, 1600, 1800, 1900, 2000, 2100, 2100, 2300];
  const tlValues = [0.8, 0.9, 1.1, 1.1, 1.3, 1.4, 1.5, 1.6, 1.6, 1.8];
  const CHART_DATA_TL = [
    {
      name: 'Training Load',
      color: '#86cf39',
      type: 'line',
      data: tlValues,
    },
    {
      name: 'AU',
      type: 'bar',
      data: auValues,
    }
  ];

  const lowestTLVal = tlValues.reduce((prev, current) => {
    if (prev < current) {
      return prev;
    } else {
      return current;
    }
  });

  const highestTLVal = tlValues.reduce((prev, current) => {
    if (prev > current) {
      return prev;
    } else {
      return current;
    }
  });

  const CHART_DATA_EVENTS = {
    categories: [
      '02/02/2022',
      '03/02/2022',
      '05/02/2022',
      '09/02/2022',
      '10/02/2022',
      '11/02/2022',
      '13/02/2022',
      '15/02/2022',
      '17/02/2022',
      '19/02/2022',
    ],
  };

  const chartOptions = {
    title: {
      text: 'Training Load',
      style: {
        fontSize: '20px',
      },
      margin: 20,
    },
    markers: {
      size: 2,
    },
    chart: {
      id: 'Training Load',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      },
    },
    stroke: {
      show: true,
      curve: 'smooth' as 'smooth',
      lineCap: 'butt' as 'butt',
      width: 4,
    },
    legend: {
      show: true,
      fontSize: '16px',
      fontWeight: 600,
    },
    annotations: {
      yaxis: [
        {
          y: lowestTLVal,
          y2: 1.3,
          width: '120%',
          offsetX: -35,
          borderColor: 'rgb(135, 207, 58)',
          fillColor: 'rgb(135, 207, 58)',
        },
        {
          y: 1.3,
          y2: 1.5,
          width: '120%',
          offsetX: -35,
          borderColor: 'rgb(255, 235, 93)',
          fillColor: 'rgb(255, 235, 93)',
        },
        {
          y: 1.5,
          y2: highestTLVal + 0.13,
          width: '120%',
          offsetX: -35,
          borderColor: 'rgb(255, 87, 34)',
          fillColor: 'rgb(255, 87, 34)',
        },
      ],
    },
    grid: {
      show: true,
    },
    yaxis: [
      {
        title: {
          text: 'Training Load',
          style: {
            fontSize: '1rem',
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'AU',
          floating: true,
          style: {
            fontSize: '1rem',
          },
        },
      },
    ],
    xaxis: CHART_DATA_EVENTS,
  };
  return (
    <Grid item xs={12}>
      <Paper elevation={1} sx={{padding: '1rem'}}>
        <ReactApexChart
          type="line"
          options={chartOptions}
          series={CHART_DATA_TL}
          height={500}
        />
      </Paper>
    </Grid>
  );
}

export default ChartLine;
