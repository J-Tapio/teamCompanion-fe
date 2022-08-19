import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//==============================================================================

export default function LogModal() {
  const [open, setOpen] = useState(true);
  const welcomeImage =
    'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/welcome_RDkL6zFXD.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658915193535';

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="changelog-dialog"
      sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: '900px' },
      }}
    >
      <DialogContent>
        <Stack>
          <Typography
            variant="h4"
            textAlign={'center'}
            sx={{ fontWeight: 500 }}
          >
            Welcome to demo of teamCompanion
          </Typography>
          <Box
            component="img"
            src={welcomeImage}
            sx={{ objectFit: 'contain', height: '250px' }}
          />
          <Typography variant="h6" pt={5} textAlign={'center'}>
            Project is evolving all the time and I will include here all
            possible changes/feature additions.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.2rem' }}>
            Currently you can create fitness events and create fitness program
            for an event.
          </Typography>
          <Typography variant="body1" pt={1} sx={{ fontSize: '1.2rem' }}>
            Go ahead and try to{' '}
            <Link underline="none" href="/dashboard/calendar" color={'#5abb89'}>
              create fitness event
            </Link>{' '}
            and then work on training program for your created event.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.2rem' }}>
            This one-man project hopefully someday reach a point where I could provide this app as a tool for divisional teams where budget is already low. Divisional teams still to this day rely heavily on using Excel sheets to track team progress in many ways. With this app, team management could create events, training programs, have messaging between team-members etc. 
            Team managers could also have Kanban available to carry out effectively team administration.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.2rem' }}>
            Divisional teams rely heavily on using Excel sheets to track team progress in many ways to this day. Some teams find it very useful and some don't. With this app, team management could create events, training programs, have messaging between team-members etc. 
            Team managers could also have Kanban available to carry out effectively team administration.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.2rem' }}>
            With this app, team management could create events, training programs, have messaging between team-members etc. 
            Team managers could also have Kanban available to carry out and follow effectively team administration tasks. In overall, app could provide tools to manage team efficiently.
          </Typography>
          <Typography variant="h6" pt={5}>
            {'TODO'}
          </Typography>
          <Typography variant="body1" pt={2} sx={{ fontWeight: 500 }}>
            Enhance user experience within event creation and fitness program
          </Typography>
          <ul>
            <li>
              Within fitness program - going back and forward within exercise
              creation should be able to show what was selected before. Now it
              is all or nothing strategy to go until end or reset and start from
              the beginning to create exercise for program.
            </li>
          </ul>
          <Typography variant="h6" pt={5}>
            Changelog
          </Typography>
          <Typography variant="h6" pt={10} textAlign="center">
            Juha-Tapio Turpeinen - 2022
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
