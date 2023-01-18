import { useState, useEffect } from 'react';
// Date-Fns
import { add } from 'date-fns';
// FullCalendar
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventContentArg,
  formatDate,
  EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
// MaterialUI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Calendar style
import CalendarStyle from './CalendarStyle';
// Form dialog to select time for event
import FormDialog from './FormDialog';
// Redux
import { RootState, useSelector, useDispatch } from '../../store';
import {
  setEventDate,
  hasError,
  getEvents,
  ICreatedActivity,
} from 'store/slices/events';
// Components
import EventInfoDialog from './EventInfoDialog';
//============================================================================//

//TODO: FullCalendar documentation suggest use of validRange. This way past days are not visible but it would be better to render calendar fully and show maybe eg. past events. Change later the implementation in a way that past events can be seen and possibly new events re-created with future date/time etc.

export default function Calendar() {
  const dispatch = useDispatch();
  const { membersSelected, error, createdEvents, formStep } = useSelector(
    (state: RootState) => state.events,
  );
  const { teamId } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const [eventInfoOpen, setEventInfoOpen] = useState(false);
  const [eventInFocus, setEventInFocus] = useState<ICreatedActivity | null>(
    null,
  );

  const handleClose = () => {
    if (error) {
      dispatch(hasError(false));
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    dispatch(setEventDate(new Date(selectInfo.startStr)));
    setOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    let eventId = parseInt(clickInfo.event.id);
    let createdEvent = createdEvents.filter((event) => event.id === eventId)[0];
    setEventInFocus(createdEvent as ICreatedActivity);
    setEventInfoOpen(true);
  };

  const handleCreatedEvents = (): EventInput[] => {
    if (createdEvents.length > 0) {
      let formattedCalendarEvents = createdEvents.map((event) => {
        return {
          id: `${event.id}`,
          title: event.activityType,
          date: event.activityStart.slice(0, 10),
          start: event.activityStart,
          end: event.activityEnd,
        };
      });
      return formattedCalendarEvents;
    } else {
      return [
        {
          id: 'example training',
          title: 'Example event',
          start: new Date(),
        },
      ];
    }
  };

  useEffect(() => {
    dispatch(getEvents(teamId as number));
  }, []);

  return (
    <Grid item xs={12} visibility={membersSelected ? 'visible' : 'hidden'}>
      <FormDialog open={open} handleClose={handleClose} />
      {eventInFocus && (
        <EventInfoDialog
          eventInfoOpen={eventInfoOpen}
          setEventInfoOpen={setEventInfoOpen}
          eventInfo={eventInFocus}
        />
      )}
      <Paper elevation={2} sx={{ padding: '1rem' }}>
        <Typography variant="h4" fontWeight="500" gutterBottom>
          Choose Event Date
        </Typography>
        <CalendarStyle>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            weekends
            selectable
            validRange={{ start: new Date().toISOString().slice(0, 10) }}
            dayMaxEventRows={3}
            select={handleDateSelect}
            eventClick={handleEventClick}
            events={[...handleCreatedEvents()]}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: true,
            }}
            displayEventTime={true}
            displayEventEnd={false}
            eventColor={'#87cf3a'}
            eventBackgroundColor={'#87cf3a'}
            eventTextColor={'#000000'}
          />
        </CalendarStyle>
      </Paper>
    </Grid>
  );
}

/* 
[{ title: 'Team Practise', date: '2022-07-11' }] */
