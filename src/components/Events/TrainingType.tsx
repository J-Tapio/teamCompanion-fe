import { useState, useContext } from 'react';
//MaterialUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
//Assets
import matchImg from '../../assets/illustrations/pages/dashboard/events/match.png';
import fitnessImg from '../../assets/illustrations/pages/dashboard/events/dumbbell.png';
// Redux
import {RootState, useDispatch,useSelector} from '../../store';
import { setExerciseCategory } from 'store/slices/fitness';

//==============================================================================

type ExerciseTypeIconProps = {
  iconImg: string;
};

function EventTypeIcon({ iconImg }: ExerciseTypeIconProps) {
  return (
    <Box
      component="img"
      src={iconImg}
      sx={{ height: '1.8rem', objectFit: 'cover' }}
    />
  );
}

//------------------------------------------------------------------------------

const eventImages: string[] = [matchImg, fitnessImg];

type ExerciseTypes = 'Cardio' | 'Strength' | null;

interface IEventTypeButton {
  event: ExerciseTypes;
  index: number;
}

function EventTypeButton({
  event,
  index,
}: IEventTypeButton) {
  const dispatch = useDispatch();
  const {exerciseCategory} = useSelector((state: RootState) => state.fitness);
  const [cardHover, setCardHover] = useState(false);
  const handleSelected = (selected: ExerciseTypes) => {
    dispatch(setExerciseCategory(selected));
  };
  const handleCardHover = (cardHover: boolean) => setCardHover(cardHover);

  return (
    <Button
      key={event}
      variant="text"
      size="large"
      endIcon={<EventTypeIcon iconImg={eventImages[index]} />}
      sx={{
        color: '#000000',
        margin: '0',
        padding: '.6rem 1.2rem',
        background:
          'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 80%)',
        '&:hover': {
          background:
            'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 80%)',
        },
        ...(exerciseCategory === event && {
          background:
            'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.1) 100%), #87cf3a',
          '&:hover': {
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.5) 100%), #87cf3a',
          },
        }),
      }}
      onMouseOver={() => {
        handleCardHover(!cardHover);
      }}
      onMouseLeave={() => {
        handleCardHover(cardHover);
      }}
      onClick={() => handleSelected(event)}
    >
      <Typography
        paragraph
        fontWeight="500"
        fontSize={'1rem'}
        sx={{ margin: '0' }}
      >
        {event}
      </Typography>
    </Button>
  );
}
//------------------------------------------------------------------------------

const exerciseTypes: ExerciseTypes[] = ['Cardio', 'Strength'];

function TrainingType() {
  return (
    <Stack
      direction='row'
      spacing={4}
    >
      {exerciseTypes.map((event, index) => (
        <EventTypeButton
          key={event}
          event={event}
          index={index}
        />
      ))}
    </Stack>
  );
}

export default TrainingType;
