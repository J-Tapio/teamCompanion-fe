import { Dispatch, SetStateAction, useEffect, useState, Fragment } from 'react';
import { add, format, formatISO, compareAsc } from 'date-fns';
// MaterialUI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
// Mui-x-date
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// FullCalendar
import { DateSelectArg, NowIndicatorRoot } from '@fullcalendar/react';
// Redux
import { RootState, useSelector, useDispatch } from '../../store';
import {
  setEventParticipants,
  unsetEventParticipants,
  addEvent,
  hasError,
} from '../../store/slices/events';
// Types
import { ITeamMembers, ITeamMember } from 'types/team';
// Utils
import { dbActivityTypeIds, AppEventType } from '../../api/utils';
//============================================================================//

type EventSelectionProps = {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
};

export default function FormDialog({ open, handleClose }: EventSelectionProps) {
  const dispatch = useDispatch();
  const {
    formStep,
    eventDate,
    eventType,
    eventParticipants,
    error,
  } = useSelector((state: RootState) => state.events);
  const { teamId } = useSelector((state: RootState) => state.user);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(eventDate);
  // By default add two hours
  const [endTime, setEndTime] = useState<Date>(
    add(new Date(eventDate), { hours: 2 }),
  );
  const selectedDate = format(new Date(eventDate), 'yyyy/MM/dd');

//------------------------------------------------------------------------------

  const handleContinue = () => {
    dispatch(setEventParticipants());
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    dispatch(unsetEventParticipants());
    handleClose(!open);
    if (showConfirmation) {
      setShowConfirmation(false);
    }
  };

//------------------------------------------------------------------------------

  const handleSubmit = () => {
    const eventData = {
      activityTypeId: dbActivityTypeIds.get(
        eventType as AppEventType,
      ) as number,
      activityNotes: '',
      venueId: 2,
      activityStart: formatISO(startTime),
      activityEnd: formatISO(endTime),
    };

    const eventParticipantData = Object.values(eventParticipants)
      .flat()
      .map((participant) => {
        return {
          userTeamId: participant.userTeamId,
        };
      });

    dispatch(addEvent(teamId!, eventData, { data: eventParticipantData }));
  };

//------------------------------------------------------------------------------

  useEffect(() => {
    if (error) {
      setShowConfirmation(false);
      dispatch(hasError(false));
    }
    if (formStep === 0 && open) {
      handleClose(!open);
    }
    if (compareAsc(eventDate, startTime) !== 0) {
      setStartTime(eventDate);
      setEndTime(add(new Date(eventDate), { hours: 2 }));
    }
  }, [error, formStep, eventDate]);

  function generateParticipantLists(
    selectedTeamMembers: ITeamMembers,
  ): JSX.Element[] {
    let participantListsByDepartment: JSX.Element[] = [];

    for (let [department, participants] of Object.entries(
      selectedTeamMembers,
    )) {
      if (participants.length > 0) {
        participantListsByDepartment.push(
          <Fragment key={department}>
            <Typography
              variant="body1"
              textTransform={'capitalize'}
              fontSize={'1.2rem'}
              fontWeight={500}
            >
              {department}
            </Typography>
            <List
              sx={{
                '&.MuiList-root': { marginTop: '.5rem' },
              }}
            >
              {participants.map((teamMember: ITeamMember) => (
                <ListItem key={teamMember.userTeamId}>
                  <ListItemIcon>
                    <PersonIcon />
                    <ListItemText
                      sx={{ paddingLeft: '1rem' }}
                      primary={`${teamMember.firstName} ${teamMember.lastName}`}
                    />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Fragment>,
        );
      }
    }
    return participantListsByDepartment;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: showConfirmation ? '80%' : '50%',
        },
      }}
    >
      {error && (
        <>
          <DialogContent>
            <DialogContentText
              sx={{
                color: '#000000',
                fontSize: '1.5rem',
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              Unfortunately something went wrong. Try again with creating new
              event. If error happens again contact us.
            </DialogContentText>
          </DialogContent>
        </>
      )}

      {!error && showConfirmation && (
        <>
          <DialogTitle
            sx={{
              '&.MuiDialogTitle-root': {
                fontSize: '2rem',
              },
            }}
          >
            Created {eventType} event
          </DialogTitle>
          <DialogContent>
            <Stack direction="column" alignContent={'center'} spacing={3}>
              <Typography variant="h6">Date: {selectedDate}</Typography>
              <Typography variant="h6">
                Time:{' '}
                {`${format(new Date(startTime), 'p')} - ${format(
                  new Date(endTime),
                  'p',
                )}`}
              </Typography>
              {generateParticipantLists(eventParticipants)}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ padding: '1rem' }}>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              sx={{
                color: 'rgba(0,0,0,0.7)',
                borderColor: 'rgba(135, 207, 58, 0.7)',
                backgroundColor: 'rgb(135, 207, 58, 0.7)',
                '&:hover': {
                  color: '#000000',
                  borderColor: 'rgba(135, 207, 58, 1)',
                  backgroundColor: 'rgb(135, 207, 58, 1)',
                },
              }}
            >
              Add to Calendar
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: 'rgba(0,0,0,0.7)',
                borderColor: 'rgba(135, 207, 58, 0.7)',
                backgroundColor: 'rgb(135, 207, 58, 0.7)',
                '&:hover': {
                  color: '#000000',
                  borderColor: 'rgba(135, 207, 58, 1)',
                  backgroundColor: 'rgb(135, 207, 58, 1)',
                },
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </>
      )}

      {!error && !showConfirmation && (
        <>
          <DialogTitle>
            Choose start & end time for the event - {selectedDate}
          </DialogTitle>
          <DialogContent>
            <Stack direction="column" spacing={5} mt={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Select starting time for event"
                  value={startTime}
                  onChange={(newValue) => {
                    if (newValue) {
                      setStartTime(newValue);
                    }
                  }}
                />
                <TimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Select ending time for the event"
                  value={endTime}
                  onChange={(newValue) => {
                    if (newValue) {
                      setEndTime(newValue);
                    }
                  }}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ padding: '1rem' }}>
            <Button
              variant="outlined"
              onClick={handleContinue}
              sx={{
                color: 'rgba(0,0,0,0.7)',
                borderColor: 'rgba(135, 207, 58, 0.7)',
                backgroundColor: 'rgb(135, 207, 58, 0.7)',
                '&:hover': {
                  color: '#000000',
                  borderColor: 'rgba(135, 207, 58, 1)',
                  backgroundColor: 'rgb(135, 207, 58, 1)',
                },
              }}
            >
              Continue
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: 'rgba(0,0,0,0.7)',
                borderColor: 'rgba(135, 207, 58, 0.7)',
                backgroundColor: 'rgb(135, 207, 58, 0.7)',
                '&:hover': {
                  color: '#000000',
                  borderColor: 'rgba(135, 207, 58, 1)',
                  backgroundColor: 'rgb(135, 207, 58, 1)',
                },
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
