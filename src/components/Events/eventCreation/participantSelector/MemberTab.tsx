import { useState } from 'react';
// MaterialUI
import { Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Components
import TabPanel from './TabPanel';
import ParticipantCard from '../../ParticipantCard';
// Types
import { ITeamMember } from '../../../../types/team';
// Redux
import { RootState, useDispatch, useSelector } from '../../../../store';
import { setMembersSelected, selectAllInDepartment, unselectAllInDepartment } from '../../../../store/slices/events';


//==============================================================================

interface IAthletesTabProps {
 /*  index: number;
  value: number;
  theme: Theme; */
  department: 'coaches' | 'athletes' | 'trainers' | 'physiotherapists' | 'staff';
  teamMembers: ITeamMember[];
}

export default function MemberTab({
/*   index,
  value,
  theme, */
  department,
  teamMembers,
}: IAthletesTabProps) {
  const dispatch = useDispatch();
  // Just to mark/unmark cards
  const [allSelected, setSelectAll] = useState(false);
  const handleSelectAll = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if(checked) {
      setSelectAll(!allSelected);
      dispatch(selectAllInDepartment({ department, [department]: teamMembers }));
    } else {
      dispatch(unselectAllInDepartment({department}));
      setSelectAll(!allSelected);
    }
    dispatch(setMembersSelected());
  };


  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ padding: '.5rem 1rem', width: 'calc(100%/3 - .7rem)' }}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography
              paragraph
              sx={{ fontSize: '1.1rem', fontWeight: '500', margin: '0' }}
            >
              Select everyone?
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allSelected}
                    onChange={handleSelectAll}
                    sx={{
                      '&.Mui-checked': {
                        color: '#87cf3a',
                      },
                    }}
                  />
                }
                label=""
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 30 },
                  marginLeft: '.5rem',
                }}
              />
            </FormGroup>
          </Stack>
        </Paper>
      </Grid>
      {teamMembers.map((teamMember) => (
        <ParticipantCard allSelected={allSelected} setSelectAll={setSelectAll} department={department} key={teamMember.userTeamId} teamMember={teamMember} />
      ))}
    </>
  );
}
