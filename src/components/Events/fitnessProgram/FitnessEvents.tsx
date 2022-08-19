import {useEffect} from 'react';
// MaterialUI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Components
import EventDateCard from '../EventDateCard';
// Redux
import { RootState, useSelector } from '../../../store/index';

//==============================================================================

export default function FitnessEvents() {
  const { createdFitnessEvents } = useSelector((state:RootState) => state.fitness);

  return (
    <Paper elevation={2} sx={{padding: '1rem'}}>
      <Typography variant='h5' fontWeight='500'>Created fitness events without fitness program</Typography>
      <Grid container rowGap={1.5} columnSpacing={2} rowSpacing={1} mt={3}>
        {
          createdFitnessEvents.map((event) => (
            <Grid key={event.id} item xs={4}>
              <EventDateCard eventId={event.id} date={event.activityStart.slice(0,10)}/>
            </Grid>
          ))
        }
      </Grid>
    </Paper>
  );
}