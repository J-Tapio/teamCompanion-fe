import { format } from 'date-fns';
//MaterialUi
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
//Assets
import welcomeImg from '../../../assets/illustrations/pages/dashboard/Coach.svg'
import UpcomingMatches from '../../../components/TeamEvents/UpcomingMatches';
import WeatherWidget from '../../../components/weather/WeatherWidget';
// Components
import LastMatch from '../../../components/TeamEvents/LastMatch';
import LogModal from 'components/modals/LogModal';
// Redux
import {RootState, useSelector, useDispatch} from '../../../store';
import {getUser} from '../../../store/slices/user';
import { useEffect } from 'react';

//==============================================================================


type Props = {
  children: JSX.Element | JSX.Element[];
};


function TeamEvents() {
  const dispatch = useDispatch();
  const {error, loading, teamRole, lastName } = useSelector((state:RootState) => state.user);
  const currentDate = format(new Date(), 'eeee, MMMM dd, yyy');

  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <Grid item xs={12}>
      <LogModal />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            paddingX: '1rem',
          }}
        >
          <Box
            component="img"
            alt="Team logo"
            src={welcomeImg}
            sx={{ height: '300px' }}
          />
          {
            loading && (<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress />
              </Box>)
          }
          {!loading && (
            <Stack>
              <Typography variant="h4" fontWeight={700}>
                Welcome back, {teamRole} {lastName}!
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {currentDate}
              </Typography>
            </Stack>
          )}
          { error && (
            <Stack>
              <Typography variant="h4" fontWeight={700}>
                Unfortunately something went wrong while fetching your profile information.
              </Typography>
            </Stack>
          )
          }
        </Paper>
      </Box>
      <Grid container rowGap={3} mt={3}>
        <WeatherWidget />
        <LastMatch />
        <UpcomingMatches />
      </Grid>
    </Grid>
  );
}

export default TeamEvents;