import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//============================================================================//

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
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            Currently you can create fitness events and create fitness program
            for an event.
          </Typography>
          <Typography variant="body1" pt={1} sx={{ fontSize: '1.1rem' }}>
            Go ahead and try to{' '}
            <Link underline="none" href="/dashboard/calendar" color={'#5abb89'}>
              create fitness event
            </Link>{' '}
            and then work on training program for your created event.
          </Typography>
      {/*     <Typography variant="h6" pt={5}>
            Please read info below!
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            Database data will be resetted to default values every 30 minutes. Why? You might see that there are fitness events created even if you did not create them. This indicate that just recently someone else was trying out the demo-app.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            For this reason database data is set to reset every 30 minutes to default values and hopefully avoid confusion when trying out the demo-app.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            Unfortunately this might also mean that you just created an fitness event but it is not showing up when you want to create a training program for the event. In this case data had been resetted and unfortunately there is a need to create a new event and then carry on again with creating fitness program for the event.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            Apologies for any inconvenience/confusion about this.
          </Typography> */}
          <Typography variant="h6" pt={5} sx={{ fontSize: '1.3rem'}}>
            What is the goal of this app eventually?
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            This project hopefully someday reaches a point where I could provide this app as a tool for divisional teams where budget is tight and some easy-to-use app could make it easier for team management to handle team events and training.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            Divisional teams still rely heavily on Excel sheets to track team progress and handle training programs in many ways to this day. Also, other team operations might be handled on email-basis or with some other app. Some teams prefer to stick with the use of Excel but I somehow from my own experience feel like there could be a window of opportunity to show that all of team management related tasks could be handled with an app.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem' }}>
            With this app, team management could create events, training programs, have messaging between team-members etc. 
            Team managers could also have Kanban-like scheduling system available to carry out effectively team administration duties and plan ahead for the future events.
          </Typography>
          <Typography variant="body1" pt={5} sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
            TL;DR In overall, app could possibly provide tools to manage daily operations of a team efficiently.
          </Typography>
          <Typography variant="h6" pt={5}>
            {'TODO'}
          </Typography>
          <Typography variant="body1" pt={2} sx={{ fontSize: '1.1rem',fontWeight: 500 }}>
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
            CHANGELOG
          </Typography>
          <Typography variant="h6" pt={10} textAlign="center">
            Juha-Tapio Turpeinen - 2023
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
