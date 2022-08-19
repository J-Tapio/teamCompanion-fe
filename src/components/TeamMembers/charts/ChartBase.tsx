import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Components
import ChartDonut from './ChartDonut';
import React from 'react';

//==============================================================================
interface Props {
  children: React.ReactNode | React.ReactNode[]
}

function ChartBase({children}:Props) {

  return (
    <Paper elevation={3} sx={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" fontWeight="500" gutterBottom>
        Athlete Monitoring
      </Typography>
      <Grid container columnGap={2} rowGap={2}>
        {children}
      </Grid>
    </Paper>
  );
}

export default ChartBase;