import { useState } from 'react';
// MaterialUI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
// Redux
import { RootState, useDispatch, useSelector } from '../../store';
import {
  changeHorizontalStep,
  setEventDate,
  setSelectedFitnessEvent,
} from '../../store/slices/fitness';
//============================================================================//

interface IEventDateCardProps {
  date: string;
  eventId: number;
}

function EventDateCard({ date, eventId }: IEventDateCardProps) {
  const dispatch = useDispatch();
  const { eventDate } = useSelector((state: RootState) => state.fitness);
  const [cardHover, setCardHover] = useState(false);
  const handleCardHover = (cardHover: boolean) => setCardHover(cardHover);

  return (
    <Paper
      onMouseOver={() => {
        handleCardHover(true);
      }}
      onMouseLeave={() => {
        handleCardHover(false);
      }}
      elevation={cardHover ? 8 : 2}
    >
      <Button
        onClick={() => {
          dispatch(changeHorizontalStep(1));
          dispatch(setEventDate(date));
          dispatch(setSelectedFitnessEvent(eventId));
        }}
        variant="text"
        size="small"
        endIcon={
          <EventNoteTwoToneIcon sx={{ height: '2rem', width: '2rem' }} />
        }
        sx={{
          width: '100%',
          color: '#000000',
          margin: '0',
          paddingY: '.5rem',
          '.MuiSvgIcon-root': {
            fill: 'rgb(158, 158, 158)',
          },
          background:
            'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(158, 158, 158,0.1) 80%)',
          '&:hover': {
            '.MuiSvgIcon-root': {
              fill: '#000000',
            },
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(158, 158, 158,0.3) 80%)',
          },
          ...(eventDate === date && {
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.1) 100%), #87cf3a',
            '.MuiSvgIcon-root': {
              fill: '#000000',
            },
            '&:hover': {
              background:
                'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.3) 100%), #87cf3a',
            },
          }),
        }}
      >
        <Typography
          paragraph
          textAlign={'center'}
          fontWeight="500"
          fontSize={'1.3rem'}
          sx={{ margin: '0' }}
        >
          {date}
        </Typography>
      </Button>
    </Paper>
  );
}

export default EventDateCard;
