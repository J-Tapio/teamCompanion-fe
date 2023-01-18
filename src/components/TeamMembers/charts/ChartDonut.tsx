// MaterialUI
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Components
import ReactApexChart from 'react-apexcharts';
//============================================================================//


function ChartDonut() {
  const CHART_DATA = [44, 55, 13];
  const chartOptions = {
    title: {
      text: 'Overall Training',
      style: {
        fontSize: '20px',
      },
    },
    legend: {
      fontSize: '16px',
      itemMargin: {
        vertical: 10
      },
      offsetY: 45,
    },
    labels: ['Team Training', 'Match', 'Fitness'],
    stroke: { show: false },
    plotOptions: { pie: { donut: { size: '50%' } } },
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={1} sx={{ padding: '1rem' }}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction="row" spacing={1}>
            <ReactApexChart
              type="donut"
              series={CHART_DATA}
              options={chartOptions}
              width={400}
            />
          </Stack>
          <Stack>
            <Typography variant="h6">
              Demo of possible athlete monitoring information.
            </Typography>
            <Typography variant="body1">
              Could contain later training load / athlete survey info.
            </Typography>
            <Typography variant="body1">
              Apex chart was modified to provide thresholds of training load.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, backgroundColor: '#ffcdbd' }}>
              Injury risk high
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, backgroundColor: '#fff9cf' }}>
              Injury risk moderate
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, backgroundColor: '#dbf1c4' }}>
              Sweet spot
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ChartDonut;
