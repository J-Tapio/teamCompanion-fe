// MaterialUI
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
// Components
import LoginForm from '../../components/authentication/login/LoginForm';

//==============================================================================

const styles = {
  containerStyle: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxStyle: {
    width: '70%',
  },
};

const loginImage =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/login-fitness_kT0BAuIGp.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1658395538010';

export default function Login() {
  return (
    <Container sx={styles.containerStyle}>
      <Box sx={styles.boxStyle}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box component={'img'} src={loginImage} />
        </Box>
        <Stack direction="row" alignItems="center" sx={{ mb: 2, mt: 5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to TeamCompanion
            </Typography>
            <Typography>Enter log-in details to see the demo-pages.</Typography>
          </Box>
        </Stack>
        <Alert
          severity="info"
          sx={{
            mb: 3,
            backgroundColor: '#bdfddc',
            '&.MuiAlert-root .MuiAlert-icon': { color: '#000000' },
          }}
        >
          Use email : <strong>coach@hawkinsfc.com</strong> / password :
          <strong>&nbsp;coachHopper</strong>
        </Alert>
        <LoginForm />
      </Box>
    </Container>
  );
}
