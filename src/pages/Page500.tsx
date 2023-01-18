import { useNavigate } from 'react-router-dom';
// MaterialUI
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// Route
import { PATH_DASHBOARD } from 'routes/paths';
//============================================================================//

/* 
Illustration by storyset
<a href='https://www.freepik.com/vectors/server-error'>Server error vector created by storyset - www.freepik.com</a>
*/

const containerStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const error505Image =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/505_vbsm6_tM6.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1658394863736';

function Page500() {
  const navigate = useNavigate();
  const navigateHome = () => navigate(PATH_DASHBOARD.events.root);

  return (
    <Box sx={containerStyle}>
      <Box>
        <Stack
          direction="column"
          spacing={5}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2, mt: 5 }}
        >
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="https://www.freepik.com/vectors/server-error -Server error vector created by storyset - www.freepik.com"
          >
            <Box component="img" src={error505Image} sx={{ height: '600px' }} />
          </Tooltip>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Oh no!
            </Typography>
            <Typography variant="h6">
              Something went wrong. If this happens again, contact us.
            </Typography>
          </Box>
          <Paper elevation={4}>
            <Button
              variant="outlined"
              size="large"
              onClick={navigateHome}
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
              Go Back
            </Button>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
export default Page500;
