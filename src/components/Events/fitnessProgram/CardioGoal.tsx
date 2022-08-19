import { useState, useContext } from 'react';
// MaterialUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// Redux
import { dispatch, RootState, useSelector } from '../../../store';
import { editCurrentCardioExercise, setCardioGoal } from '../../../store/slices/fitness';
//==============================================================================

type CardioTypeProps = {
  iconImg: string;
};
function EventTypeIcon({ iconImg }: CardioTypeProps) {
  return (
    <Box
      component="img"
      src={iconImg}
      sx={{ height: '1.8rem', objectFit: 'cover' }}
    />
  );
}

//------------------------------------------------------------------------------
let durationImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/duration.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393118395';
let distanceImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/distance.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393108411';


const eventImages: string[] = [durationImg, distanceImg];
interface ICardioGoalBtnProps {
  event: CardioGoal;
  index: number;
}

function CardioGoalButton({ event, index }: ICardioGoalBtnProps) {
  const { cardioGoal, currentCardioExercise } = useSelector((state: RootState) => state.fitness);
  const [cardHover, setCardHover] = useState(false);
  const handleSelected = (selected: CardioGoal) => {
    dispatch(setCardioGoal(selected));
    dispatch(editCurrentCardioExercise({
      ...currentCardioExercise,
      cardioGoal:selected,
    }))
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
        ...(cardioGoal === event && {
          background:
            'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.1) 100%), #87cf3a',
          '&:hover': {
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.5) 100%), #87cf3a',
          },
        }),
      }}
      onMouseOver={() => {
        handleCardHover(true);
      }}
      onMouseLeave={() => {
        handleCardHover(false);
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

type CardioGoal = 'Duration' | 'Distance' | null;
const cardioGoalTypes: CardioGoal[] = ['Duration', 'Distance'];

export default function CardioGoal() {
  return (
    <Stack direction="row" spacing={4}>
      {cardioGoalTypes.map((event, index) => (
        <CardioGoalButton
          key={event}
          event={event}
          index={index}
        />
      ))}
    </Stack>
  );
}
