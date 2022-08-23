import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import TeamMemberCard from '../../../components/TeamMembers/TeamMemberCard';
import TeamMemberCardFocused from '../../../components/TeamMembers/TeamMemberCardFocused';
//MaterialUi
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Components
import AthleteMonitoring from '../../../components/TeamMembers/AthleteMonitoring';
// Redux
import { RootState, useDispatch, useSelector } from '../../../store';
// Types
import { ITeamMember } from '../../../types/team';
//==============================================================================
/**
 * Rename this component to something else maybe?
 * Add accordions to different team member categories, athletes, trainers, staff
 * Add chart, which shows athlete's training load.
 */


interface TeamMemberSelectionProps {
  allMembers: ITeamMember[];
  selectedMember: ITeamMember | null;
  setSelectedMember: Dispatch<SetStateAction<ITeamMember | null>>;
}

function TeamMemberSelection({
  allMembers,
  selectedMember,
  setSelectedMember,
}: TeamMemberSelectionProps) {

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ITeamMember | null,
  ) => {
    if (value) {
      setSelectedMember(value);
    }
  };

  return (
    <Autocomplete
      id="team-member-selection"
      sx={{
        width: 300,
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#000000',
        },
        '&:hover .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(135, 207, 58, 1)',
        },
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(135, 207, 58, 0.8)',
        },
      }}
      options={allMembers}
      autoHighlight
      getOptionLabel={(option: ITeamMember) =>
        `${option.firstName} ${option.lastName}`
      }
      value={selectedMember}
      onChange={handleChange}
      renderOption={(props, option) => (
        <Box component="li" key={option.userTeamId} {...props}>
          <PersonIcon />
          {option.firstName} {option.lastName}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Choose team member" />
      )}
    />
  );
}


function TeamMembers() {
  const { teamMembers } = useSelector((state: RootState) => state.team);
  //! Only athletes shown for now.
  let allMembers:ITeamMember[];
  if(teamMembers) {
    allMembers = Object.values(teamMembers.athletes).flat();
  } else {
    allMembers = [{userId: 1, userTeamId: 1, firstName: "Example", lastName: "Athlete", teamRole: "Athlete", status: "Active"}]
  }
  const [selectedMember, setSelectedMember] = useState<ITeamMember | null>(null);

  /* const [selectedMember, setSelectedMember] = useState<ISelectedMember | null>(exampleFocusInfo); */

  return (
    <Grid item xs={12}>
      <Stack spacing={5}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h3" fontWeight={700}>
            Team Members
          </Typography>
          {teamMembers && (
            <TeamMemberSelection
              allMembers={allMembers}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
            />
          )}
        </Box>
        <TeamMemberCardFocused
          teamMember={selectedMember ? selectedMember : allMembers[0]}
        />
        <AthleteMonitoring />
      </Stack>
    </Grid>
  );
}

export default TeamMembers;
