import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { deepOrange, lightGreen } from '@mui/material/colors';
import { ITeamMember } from 'types/team';


interface ITeamMemberProps {
  teamMember: ITeamMember
  selectedMember?: ITeamMember | null;
}


function TeamMemberCardFocused({teamMember}: ITeamMemberProps) {
  return (
    <Paper elevation={3} sx={{ padding: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Avatar
          sx={{ bgcolor: lightGreen[500], height: '180px', width: '180px' }}
        >
          {teamMember.firstName.slice(0, 1)}
          {teamMember.lastName.slice(0, 1)}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            marginLeft: '2rem',
            justifyContent: 'space-between',
          }}
        >
          <Stack>
            <Typography variant="h4" fontWeight={700}>
              {teamMember.firstName} {teamMember.lastName}
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {teamMember.teamRole}
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', marginRight: '2rem' }}>
            <Stack>
              <Typography variant="h5" fontWeight={700}>
                Information
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                Status: {teamMember.status}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default TeamMemberCardFocused;