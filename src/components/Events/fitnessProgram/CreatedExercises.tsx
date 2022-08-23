import { useEffect, useState } from 'react';
import axios from 'axios';
// MaterialUI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Redux
import { RootState, useSelector, useDispatch } from '../../../store';
import { discardExerciseProgram, hasError, initializeForm, setSubmitSuccessful } from 'store/slices/fitness';
// Types
import { ITeamMember } from '../../../types/team';
// API
import { PATH_API } from 'api';

//==============================================================================

type ParticipantAccordionProps = { participants: ITeamMember[] };

function ParticipantsAccordion({ participants }: ParticipantAccordionProps) {
  return (
    <Accordion
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 'calc(100%)',
        zIndex: 100,
        '&.MuiAccordion-root': {
          border: '1px solid #87cf3a',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="button">Assigned</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {participants.map((participant) => (
            <Chip
              key={participant.userTeamId}
              label={`${participant.firstName} ${participant.lastName}`}
              sx={{ fontWeight: 500, fontSize: '.9rem' }}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

//------------------------------------------------------------------------------
// Utility functions when formatting data before submission
// TODO: Change initial state values to expect right values to begin with. Will get rid of this redundant conversion before actual submission!

const calculateDuration = (duration: string): number => {
  return parseInt(duration.replace(':', '.'));
};

const calculateDistance = (distance: string): number => {
  let [km, m] = distance.split('.');
  return parseInt(km) * 1000 + parseInt(m);
};
//------------------------------------------------------------------------------

export default function CreatedExercises() {
  const dispatch = useDispatch();
  const { eventDate, createdProgramExercises, selectedFitnessEvent, error } =
    useSelector((state: RootState) => state.fitness);
  const { teamId } = useSelector((state: RootState) => state.user);
  const [displayElement, setDisplayElement] = useState(false);

  interface IExerciseToSubmit {
    userTeamActivitiesId: number;
    exercisesEquipmentId: number;
    assignedExWeight: number | null;
    assignedExRepetitions: number | null;
    assignedExDuration: number | null;
    assignedExDistance: number | null;
  }

  const formatProgramForSubmission = (): IExerciseToSubmit[] => {
    let exercisesToSubmit: IExerciseToSubmit[] = [];

    if (createdProgramExercises.length > 0 && selectedFitnessEvent) {
      createdProgramExercises.forEach((exercise) => {
        if (exercise.exerciseCategory === 'Cardio') {
          exercisesToSubmit.push({
            userTeamActivitiesId: selectedFitnessEvent.id,
            exercisesEquipmentId: exercise.exercisesEquipmentId,
            assignedExWeight: null,
            assignedExRepetitions: null,
            assignedExDuration: exercise?.duration
              ? calculateDuration(exercise.duration)
              : null,
            assignedExDistance: exercise?.distance
              ? calculateDistance(exercise.distance)
              : null,
          });
        } else {
          for (let i = 0; i < parseInt(exercise.sets); i++) {
            exercisesToSubmit.push({
              userTeamActivitiesId: selectedFitnessEvent.id,
              exercisesEquipmentId: exercise.exercisesEquipmentId,
              assignedExWeight: exercise?.weight
                ? parseInt(exercise.weight)
                : null,
              assignedExRepetitions: exercise?.repetitions
                ? parseInt(exercise.repetitions)
                : null,
              assignedExDuration: null,
              assignedExDistance: null,
            });
          }
        }
      });
    }
    return exercisesToSubmit;
  };

  const handleSubmit = async () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('accessToken')}`;

    if (selectedFitnessEvent && teamId) {
      // "/activities/team/:teamId/activity/fitness/:activityId
      let response = await axios.post(
        PATH_API.activities.root +
          `${teamId}` +
          '/activity/fitness/' +
          selectedFitnessEvent.id,
        { data: formatProgramForSubmission() },
      );
      if (response.status === 201) {
        setDisplayElement(false);
        dispatch(discardExerciseProgram());
        dispatch(initializeForm());
        dispatch(setSubmitSuccessful(true));
      } else {
        dispatch(hasError(true));
      }
    }
  };

  const handleDiscard = () => {
    dispatch(discardExerciseProgram());
    setDisplayElement(false);
  };

  useEffect(() => {
    if (createdProgramExercises.length > 0) {
      setDisplayElement(true);
    }
  }, [createdProgramExercises]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '1rem',
        display: displayElement ? 'block' : 'none',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        Saved exercises - {eventDate}
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
        {createdProgramExercises.length > 0 &&
          createdProgramExercises.map((ex, index) => {
            if (ex.exerciseCategory === 'Cardio') {
              return (
                <Grid key={index} item xs={4}>
                  <Paper
                    key={ex.exercise}
                    elevation={3}
                    sx={{
                      border: '1px solid #87cf3a',
                      borderRadius: '12px',
                      position: 'relative',
                      minHeight: '320px',
                    }}
                  >
                    <Stack
                      spacing={2}
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography variant="button" sx={{ fontSize: '1.1rem' }}>
                        {ex.exerciseCategory}
                      </Typography>
                      <Typography variant="button">{ex.equipment}</Typography>
                      <Typography variant="button">{ex.exercise}</Typography>
                      {ex?.duration && (
                        <Typography variant="button">
                          Duration: {ex.duration} <small>min</small>
                        </Typography>
                      )}
                      {ex?.distance && (
                        <Typography variant="button">
                          Distance: {ex.distance} <small>km</small>
                        </Typography>
                      )}
                      <ParticipantsAccordion participants={ex.participants} />
                    </Stack>
                  </Paper>
                </Grid>
              );
            }
            if (ex.exerciseCategory === 'Strength') {
              return (
                <Grid key={index} item xs={4}>
                  <Paper
                    key={ex.exercise}
                    elevation={3}
                    sx={{
                      border: '1px solid #87cf3a',
                      borderRadius: '12px',
                      position: 'relative',
                      minHeight: '320px',
                    }}
                  >
                    <Stack
                      spacing={2}
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography variant="button" sx={{ fontSize: '1.1rem' }}>
                        {ex.exerciseCategory}
                      </Typography>
                      <Typography variant="button">{ex.equipment}</Typography>
                      <Typography variant="button">{ex.exercise}</Typography>
                      <Typography variant="button">
                        Weight: {ex.weight} <small>kg</small>
                      </Typography>
                      <Typography variant="button">
                        Repetitions: {ex.repetitions}
                      </Typography>
                      <Typography variant="button">Sets: {ex.sets}</Typography>
                      <ParticipantsAccordion participants={ex.participants} />
                    </Stack>
                  </Paper>
                </Grid>
              );
            }
          })}
      </Grid>
      <Button
        onClick={handleSubmit}
        sx={{
          marginTop: '2rem',
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
        Save fitness program
      </Button>
      <Button
        onClick={handleDiscard}
        sx={{
          marginTop: '2rem',
          marginLeft: '2rem',
          padding: '.5rem 1.2rem',
          color: '#000000',
          background:
            ' linear-gradient(120deg, rgba(246,25,42,1) 0%, rgba(255,255,255,1) 90%)',
          '&:hover': {
            background:
              ' linear-gradient(120deg, rgba(246,25,42,1) 0%, rgba(255,255,255,1) 100%)',
          },
        }}
      >
        Discard
      </Button>
    </Paper>
  );
}
