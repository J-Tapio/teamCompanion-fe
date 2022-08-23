import { useState, useEffect, forwardRef } from 'react';
// MaterialUI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// Components
import FitnessStepper from '../../../components/Events/fitnessProgram/EventStepperFitness';
import FitnessEvents from '../../../components/Events/fitnessProgram/FitnessEvents';
import ExerciseCreation from '../../../components/Events/fitnessProgram/ExerciseCreation';
import CreatedExercises from '../../../components/Events/fitnessProgram/CreatedExercises';
// Redux
import { RootState, useSelector, useDispatch } from '../../../store';
import {
  getEquipment,
  getFitnessEvents,
  initializeForm,
  setCardioEquipment,
  setSubmitSuccessful,
} from '../../../store/slices/fitness';

//==============================================================================

type DesignAreaProps = {
  children: JSX.Element | JSX.Element[];
};

//TODO: Rename component
function DesignArea({ children }: DesignAreaProps) {
  const { eventDate } = useSelector((state: RootState) => state.fitness);
  const [displayElement, setDisplayElement] = useState(false);

  useEffect(() => {
    if (eventDate) {
      setDisplayElement(true);
    }
  }, [eventDate]);

  return (
    <Paper
      elevation={3}
      sx={{ padding: '1rem', display: displayElement ? 'block' : 'none' }}
    >
      <Typography variant="h5" fontWeight="500">
        Design training program {eventDate ? `- ${eventDate}` : ''}
      </Typography>
      {children}
    </Paper>
  );
}

//------------------------------------------------------------------------------

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//------------------------------------------------------------------------------
export default function FitnessProgram() {
  const dispatch = useDispatch();
  const { teamId } = useSelector((state: RootState) => state.user);
  const {
    error,
    createdFitnessEvents,
    submitSuccessful,
  } = useSelector((state: RootState) => state.fitness);
  const [showAddMoreInfo, setShowAddMoreInfo] = useState<boolean>(false);


  const handleMoreInfoClose = () => {
    setShowAddMoreInfo(false);
  }

  useEffect(() => {
    if (teamId) {
      dispatch(initializeForm());
      dispatch(getFitnessEvents(teamId));
      dispatch(getEquipment());
    }
    if (submitSuccessful) {
      const successTimer = setTimeout(() => {
        dispatch(setSubmitSuccessful(false));
        setShowAddMoreInfo(true);
      }, 2000);
      return () => clearTimeout(successTimer);
    }
  }, [submitSuccessful]);

  return (
    <Grid item xs={12}>
      <Stack spacing={5}>
        <Typography variant="h3" fontWeight="700">
          Create Fitness Program
        </Typography>
        {!error && (
          <>
            <FitnessStepper />
            <FitnessEvents />
            <CreatedExercises />
            <DesignArea>
              <ExerciseCreation />
            </DesignArea>
          </>
        )}
        {error && createdFitnessEvents.length < 1 && (
          <>
            <Typography variant="h6">
              No fitness events found. Please{' '}
              <Link href="/dashboard/calendar" underline="none" color="#87cf3a">
                create one
              </Link>{' '}
              to work on.
            </Typography>
          </>
        )}
        {submitSuccessful && (
          <Snackbar open={true} autoHideDuration={3000}>
            <Alert severity="success">Exercises added successfully!</Alert>
          </Snackbar>
        )}
        {showAddMoreInfo && (
          <Snackbar open={true} autoHideDuration={6000} onClose={handleMoreInfoClose}>
            <Alert severity="info">You can add more if you like but this is where current demo of creating training program ends.</Alert>
          </Snackbar>
        )}
      </Stack>
    </Grid>
  );
}
