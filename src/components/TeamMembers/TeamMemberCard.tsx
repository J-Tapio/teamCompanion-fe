import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { deepOrange, lightGreen } from '@mui/material/colors';
// Assets
import coachImg from "../../assets/illustrations/pages/dashboard/Coach.svg";

//==============================================================================

interface ISelectedMember {
  name: string;
  teamRole: string;
  memberStatus: string;
  email: string;
  phone: string;
}

interface ITeamMember {
  teamMember: {
    name: string;
    teamRole: string;
    memberStatus: string;
    email: string;
    phone: string;
  };
  setSelectedMember: React.Dispatch<React.SetStateAction<ISelectedMember | null>>;
}

function TeamMemberCard({teamMember, setSelectedMember}: ITeamMember) {
  const [hover, setHover] = useState(false);
  const handleHoverOn = () => setHover(true);
  const handleHoverOff = () => setHover(false);
  const handleMemberSelect = () => setSelectedMember(teamMember);

  return (
    <Grid item xs
    onMouseOver={handleHoverOn} 
    onMouseLeave={handleHoverOff}
    onClick={handleMemberSelect}
    sx={{
      minWidth: "280px"
    }}
    >
      <Paper
        elevation={hover ? 5 : 1}
        sx={{
          display: 'flex',
          padding: '.5rem',
          alignItems: 'center',
          background:
            'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 80%)',
          '&:hover': {
            cursor: "pointer",
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 80%)',
          },
        }}
      >
        {/* 
            Image
            name
            role
          */}
        <Avatar
          sx={{ bgcolor: lightGreen[600], height: '4rem', width: '4rem' }}
        >
          {}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '1rem',
          }}
        >
          <Typography variant="h6" m={0} whiteSpace="nowrap">
            {teamMember.name}
          </Typography>
          <Typography
            paragraph
            m={0}
            sx={{ fontSize: '.9rem', fontWeight: '700' }}
          >
            {teamMember.teamRole}
          </Typography>
        </Box>
        {/* 
      Team role based image
    */}
        <Box component="img" src={coachImg} sx={{ height: '3.38rem' }} />
      </Paper>
    </Grid>
  );
}

export default TeamMemberCard;
