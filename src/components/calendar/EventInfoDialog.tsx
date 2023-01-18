import { Fragment, Dispatch, SetStateAction } from 'react';
// MaterialUI
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
// Date-Fns
import { format } from 'date-fns';
// Types
import {
  ICreatedActivity,
  ICreatedEventParticipants,
} from 'store/slices/events';
import { ITeamMember } from 'types/team';
//============================================================================//

interface EventInfoDialogProps {
  eventInfoOpen: boolean;
  setEventInfoOpen: Dispatch<SetStateAction<boolean>>;
  eventInfo: ICreatedActivity;
}

export default function EventInfoDialog({
  eventInfoOpen,
  setEventInfoOpen,
  eventInfo,
}: EventInfoDialogProps) {
  const handleClose = () => {
    setEventInfoOpen(!eventInfoOpen);
    // MUI default is to scroll-top on closing dialog?
    // Works for now but not the best solution to avoid scroll to top on closing dialog modal
    // https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
    let scrollContainer = document.querySelector('.css-18aturi');
    if (scrollContainer) {
      window.scrollTo(0, scrollContainer.scrollHeight);
    }
  };

  function generateParticipantLists(
    eventParticipants: ICreatedEventParticipants,
  ): JSX.Element[] {
    let participantListsByDepartment: JSX.Element[] = [];

    for (let [department, participants] of Object.entries(eventParticipants)) {
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
      open={eventInfoOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
        },
      }}
    >
      <DialogContent>
        <Stack direction="column" alignContent={'center'} spacing={3}>
          <Typography variant="h4">{eventInfo.activityType}</Typography>
          <Typography variant="h6">
            {eventInfo.activityStart.slice(0, 10)}
          </Typography>
          <Typography variant="h6">
            {`${format(new Date(eventInfo.activityStart), 'p')} - ${format(
              new Date(eventInfo.activityEnd),
              'p',
            )}`}
          </Typography>
          {generateParticipantLists(eventInfo.participants)}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
