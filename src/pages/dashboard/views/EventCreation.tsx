import { useEffect, useState, forwardRef } from 'react';
// MaterialUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// Components
import EventStepper from '../../../components/Events/EventsStepper';
import EventType from '../../../components/Events/EventType';
import Calendar from '../../../components/calendar/Calendar';
import ParticipantSelector from '../../../components/Events/ParticipantSelector';
// Redux
import { RootState, useSelector, useDispatch } from '../../../store';
import { getTeam } from '../../../store/slices/team';
import { resetForm, setSubmitSuccessful } from 'store/slices/events';
//============================================================================//

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//----------------------------------------------------------------------------//

export default function EventCreation() {
  const dispatch = useDispatch();
  const { error, teamMembers } = useSelector((state: RootState) => state.team);
  const { userTeamId } = useSelector((state: RootState) => state.user);
  const { submitSuccessful } = useSelector((state: RootState) => state.events);
  const [showAddMoreInfo, setShowAddMoreInfo] = useState<boolean>(false);

  const handleMoreInfoClose = () => {
    setShowAddMoreInfo(false);
  };

  useEffect(() => {
    if (userTeamId && !teamMembers && !submitSuccessful) {
      dispatch(getTeam(userTeamId));
    }
    if (submitSuccessful) {
      let scrollContainer = document.querySelector('.css-18aturi');
      if (scrollContainer) {
        scrollContainer.scrollTo(0, 0);
      }
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
          Create event
        </Typography>
        <EventStepper />
        <EventType />
        <ParticipantSelector />
        <Calendar />
      </Stack>
      {submitSuccessful && (
        <Snackbar open={true} autoHideDuration={3000}>
          <Alert severity="success">Event created successfully!</Alert>
        </Snackbar>
      )}
      {showAddMoreInfo && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={handleMoreInfoClose}
        >
          <Alert severity="info">
            You can add more fitness events if you want to but I suggest that
            you move to creating exercise program.
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );
}
