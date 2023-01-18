import { useState, useContext, useEffect } from 'react';
// MaterialUI
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// Types
import { Event } from 'types/events';
// Redux
import { RootState, useSelector, useDispatch } from '../../store';
import { setFormStep, setEventType } from '../../store/slices/events';
//============================================================================//

//Image assets
const matchImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/match.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393129808';
const trainingImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/training.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393140724';
const fitnessImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/dumbbell.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393086837';
const physioImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/physiotherapy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393151443';
const meetingImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Icons/meeting.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658393098045';

const eventTypes: Event[] = [
  'Match',
  'Training',
  'Fitness',
  'Physiotherapy',
  'Team Meeting',
];

const eventImages: string[] = [
  matchImg,
  trainingImg,
  fitnessImg,
  physioImg,
  meetingImg,
];

type EventTypeIconProps = {
  iconImg: string;
};

function EventTypeIcon({ iconImg }: EventTypeIconProps) {
  return (
    <Box
      component="img"
      src={iconImg}
      sx={{ height: '1.6rem', objectFit: 'cover' }}
    />
  );
}

/* endIcon={<EventTypeIcon iconImg={eventImages[index]}/> */
interface IEventTypeButton {
  event: Event;
  index: number;
}

function EventTypeButton({ event, index }: IEventTypeButton) {
  const dispatch = useDispatch();
  const { eventType } = useSelector((state: RootState) => state.events);

  const [cardHover, setCardHover] = useState(false);
  const handleSelected = (selected: Event | null) =>
    dispatch(setEventType(selected));
  const handleCardHover = (cardHover: boolean) => setCardHover(cardHover);

  return (
    <Button
      key={event}
      variant="text"
      endIcon={<EventTypeIcon iconImg={eventImages[index]} />}
      sx={{
        color: '#000000',
        margin: '0',
        padding: '.8rem 1.2rem',
        background:
          'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 80%)',
        '&:hover': {
          background:
            'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 80%)',
        },
        ...(eventType === event && {
          background:
            'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.1) 100%), #87cf3a',
          '&:hover': {
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.3) 100%), #87cf3a',
          },
        }),
      }}
      onMouseOver={() => {
        handleCardHover(true);
      }}
      onMouseLeave={() => {
        handleCardHover(false);
      }}
      onClick={() => {
        handleSelected(event);
      }}
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

export default function EventType() {
  const dispatch = useDispatch();
  const { formStep, eventType } = useSelector(
    (state: RootState) => state.events,
  );

  useEffect(() => {
    // Should be done once for step, even though event type might be changed
    if (formStep === 0 && eventType !== null) {
      dispatch(setFormStep(1));
    }
  }, [eventType]);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" fontWeight="500">
        Choose event type
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{ marginTop: '2rem' }}
      >
        {eventTypes.map((event, index) => (
          <EventTypeButton key={event} event={event} index={index} />
        ))}
      </Stack>
    </Paper>
  );
}
