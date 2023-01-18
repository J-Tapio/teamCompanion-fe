import { useState } from 'react';
// MaterialUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// Components
import InformalModal from '../modals/InformalModal';
//============================================================================//

const upcomingOpponents = [
  'New York Subliners',
  'Boston Breach',
  'Minnesota Rokkr',
];

// Team logo
const opticImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/optic_logo_xIKpnQCyh.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658393695472';
// Opponents and logos
const teamImg: { [key: string]: string } = {
  'New York Subliners':
    'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/subliners_logo_Hu8HFmOSf.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658393696429',
  'Boston Breach':
    'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/breach_logo_3H_j6qerZ.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658393695211',
  'Minnesota Rokkr':
    'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/rokkr_logo_21_6WsQcD.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658393696585',
  'Toronto Ultra':
    'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/ultra_logo_8w2k6M2RG.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658393696138',
};

export default function UpcomingMatches() {
  // Modal
  const modalText =
    'Demo app database does not contain mock-up teams. For demo-purposes made these to show what view possibly could be when landing on events section.';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // Elevation
  const [hover, setHover] = useState(false);
  const handleHoverOn = () => setHover(true);
  const handleHoverOff = () => setHover(false);

  return (
    <>
      <InformalModal open={open} setOpen={setOpen} textToUse={modalText} />
      <Grid item xs={12} onClick={handleOpen}>
        <Paper
          elevation={hover ? 10 : 0}
          onMouseOver={handleHoverOn}
          onMouseLeave={handleHoverOff}
          sx={{
            padding: '1rem',
            paddingBottom: '2rem',
            cursor: 'pointer',
          }}
        >
          <Stack textAlign="center" spacing={2}>
            <Typography variant="h4" fontWeight={'600'} textAlign={'center'}>
              Next Match
            </Typography>
            <Box>
              <Typography
                paragraph
                textAlign={'center'}
                m={0}
                fontSize={'1.4rem'}
                fontWeight={500}
              >
                Toronto Ultra vs Optic Gaming
              </Typography>
              <Typography
                paragraph
                m={0}
                fontSize={'1.2rem'}
                textAlign={'center'}
              >
                Toronto, Canada
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ height: '200px' }}>
                <Box
                  component="img"
                  src={teamImg['Toronto Ultra']}
                  sx={{
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Typography variant="h5" fontWeight={700} m={0} px={4}>
                VS
              </Typography>
              <Box sx={{ height: '200px' }}>
                <Box
                  component="img"
                  src={opticImg}
                  sx={{
                    height: '75%',
                    position: 'relative',
                    top: '1.4rem',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Stack>
          <Stack spacing={2} mt={4}>
            <Typography
              variant="h4"
              fontWeight={'700'}
              textAlign="center"
              gutterBottom
            >
              Upcoming Matches
            </Typography>
            {upcomingOpponents.map((text, index) => {
              return (
                <Box
                  key={text}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '30%' }}
                  >
                    <Box
                      component="img"
                      src={index % 2 !== 0 ? opticImg : teamImg[text]}
                      sx={{ height: '4rem', objectFit: 'cover' }}
                    />
                    <Typography
                      paragraph
                      fontWeight={700}
                      fontSize={'1.1rem'}
                      m={0}
                    >
                      {index % 2 === 0 ? text : 'Optic Gaming'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      paragraph
                      fontWeight={700}
                      fontSize={'1.5rem'}
                      m={0}
                      textAlign={'center'}
                    >
                      vs
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '30%' }}
                  >
                    <Typography
                      paragraph
                      fontWeight={700}
                      fontSize={'1.1rem'}
                      m={0}
                    >
                      {index % 2 !== 0 ? text : 'Optic Gaming'}
                    </Typography>
                    <Box
                      component="img"
                      src={index % 2 === 0 ? opticImg : teamImg[text]}
                      sx={{ height: '4rem', objectFit: 'cover' }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Paper>
      </Grid>
    </>
  );
}
