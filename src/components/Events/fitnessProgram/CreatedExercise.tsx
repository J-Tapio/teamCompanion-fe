// Types
import { ICardioExercise, IStrengthExercise } from 'types/fitness';
// MaterialUI
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
// Redux
import { RootState, useDispatch, useSelector } from '../../../store';
import {
  resetExerciseForm,
  initializeForm,
  addToExerciseProgram,
} from '../../../store/slices/fitness';
// Types
import { ITeamMember } from '../../../types/team';

//============================================================================//

type AssignedParticipantProps = {
  participants: ITeamMember[];
};

function AssignedParticipants({ participants }: AssignedParticipantProps) {
  return (
    <Grid container spacing={2}>
      {participants.map((participant) => (
        <Grid key={participant.userTeamId} item xs={2}>
          <Chip
            label={`${participant.firstName} ${participant.lastName}`}
            sx={{ fontWeight: 500, fontSize: '.9rem' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
//----------------------------------------------------------------------------//

export default function CreatedExercise() {
  const dispatch = useDispatch();
  const {
    eventDate,
    exerciseCategory,
    currentCardioExercise,
    currentStrengthExercise,
  } = useSelector((state: RootState) => state.fitness);

  const handleSave = () => {
    if (exerciseCategory === 'Cardio' && currentCardioExercise) {
      dispatch(addToExerciseProgram(currentCardioExercise));
    }
    if (exerciseCategory === 'Strength' && currentStrengthExercise) {
      dispatch(addToExerciseProgram(currentStrengthExercise));
    }
    dispatch(resetExerciseForm());
  };

  const handleReset = () => {
    dispatch(resetExerciseForm());
  };

  const ex =
    exerciseCategory === 'Cardio'
      ? currentCardioExercise!
      : currentStrengthExercise!;

  return (
    <Paper square elevation={1} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">
          Exercise to save in the program - {eventDate}
        </Typography>
        <Typography variant="button" sx={{ fontSize: '1rem' }}>
          {exerciseCategory}
        </Typography>
        <Typography variant="button">Equipment: {ex.equipment}</Typography>
        <Typography variant="button">Exercise: {ex.exercise}</Typography>
        {ex.exerciseCategory === 'Strength' && (
          <>
            <Typography variant="button">Weight: {ex.weight}kg</Typography>
            <Typography variant="button">
              Repetitions: {ex.repetitions}
            </Typography>
            <Typography variant="button">Sets: {ex.sets}</Typography>
            <Typography variant="button">Exercise assigned to:</Typography>
            <AssignedParticipants participants={ex.participants} />
          </>
        )}
        {ex.exerciseCategory === 'Cardio' && ex.cardioGoal === 'Duration' && (
          <>
            <Typography variant="button">Duration: {ex.duration}</Typography>
            <Typography variant="button">Exercise assigned to:</Typography>
            <AssignedParticipants participants={ex.participants} />
          </>
        )}
        {ex.exerciseCategory === 'Cardio' && ex.cardioGoal === 'Distance' && (
          <>
            <Typography variant="button">Distance: {ex.distance}km</Typography>
            <Typography variant="button">Exercise assigned to:</Typography>
            <AssignedParticipants participants={ex.participants} />
          </>
        )}
        <Box sx={{ paddingTop: '2rem' }}>
          <Button
            onClick={handleSave}
            sx={{
              padding: '.5rem 1.2rem',
              color: '#000000',
              background:
                'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 100%)',
              '&:hover': {
                background:
                  'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 100%)',
              },
            }}
          >
            Save to program
          </Button>
          <Button
            variant="text"
            onClick={handleReset}
            sx={{
              color: '#000000',
              background:
                'linear-gradient(130deg, rgba(112,112,112,0.5) 0%, rgba(255,255,255,1) 100%)',
              marginLeft: '1rem',
              padding: '.5rem 1.2rem',
              transition: 'background 3s',
              '&:hover': {
                background:
                  'linear-gradient(130deg, rgba(112,112,112,0.8) 0%, rgba(255,255,255,1) 100%)',
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
