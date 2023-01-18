import { useNavigate } from 'react-router-dom';
// MaterialUI
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Route
import { PATH_DASHBOARD } from '../routes/paths';
//============================================================================//

const containerStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const errorImage =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/404_C1lxwYM3q.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658394863383';


export default function Page404() {
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
          <Box component="img" src={errorImage} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Oh no!
            </Typography>
            <Typography variant="h6">
              The page you tried to find does not exist
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
              Return
            </Button>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
