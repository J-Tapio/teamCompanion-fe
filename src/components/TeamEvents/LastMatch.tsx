import { useState } from 'react';
// MaterialUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InformalModal from '../modals/InformalModal';

//==============================================================================

const opticLogo =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/optic_square.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658394449036';
const atlantaLogo =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/faze_logo_8SgRWjsSc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658394426492';

export default function LastMatch() {
  // Modal
  const modalText =
    'Demo app database does not contain mock-up teams. For demo-purposes made these to show what view possibly could be when landing on events section.';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <InformalModal open={open} setOpen={setOpen} textToUse={modalText} />
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
        onClick={handleOpen}
      >
        <Paper
          elevation={2}
          sx={{
            padding: '1rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Box
            component="img"
            src={opticLogo}
            sx={{ height: '160px', width: ' 160px' }}
          />
          <Stack>
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight="700"
              sx={{
                background:
                  'linear-gradient(140deg, rgba(2,0,36,1) 0%, rgba(134,207,57,1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Last Match
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                display={'flex'}
                sx={{ width: '180px', justifyContent: 'space-around' }}
              >
                <Typography
                  paragraph
                  m={0}
                  sx={{ fontSize: '4.5rem', fontWeight: '700' }}
                >
                  3
                </Typography>
                <Typography
                  paragraph
                  m={0}
                  sx={{ fontSize: '4.5rem', fontWeight: '700' }}
                >
                  -
                </Typography>
                <Typography
                  paragraph
                  m={0}
                  sx={{ fontSize: '4.5rem', fontWeight: '700' }}
                >
                  0
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Box
            component="img"
            src={atlantaLogo}
            sx={{
              height: '200px',
              width: '190px',
              position: 'relative',
              bottom: '1.3rem',
              right: '.5rem',
            }}
          />
        </Paper>
      </Grid>
    </>
  );
}