import React, {useState, Dispatch} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
// Types
import {ITeamMember} from '../../types/team';
// Redux
import { RootState, useSelector, useDispatch } from '../../store';
import { setMembersSelected, addSelectedMember, removeSelectedMember, unselectAllInDepartment } from '../../store/slices/events';

//============================================================================//

interface IProps {
  teamMember: ITeamMember;
  teamMemberImage?: string;
  allSelected: boolean;
  setSelectAll: Dispatch<React.SetStateAction<boolean>>;
  department:
    | 'coaches'
    | 'athletes'
    | 'trainers'
    | 'physiotherapists'
    | 'staff';
}

function ParticipantCard({teamMember, allSelected, setSelectAll, department}:IProps) {
  const dispatch = useDispatch();
  const [cardHover, setCardHover] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleSelected = () => {
    if(allSelected) {
      setSelectAll(false);
      dispatch(unselectAllInDepartment({ department }));
      setSelected(true);
    }
    if(selected && !allSelected) {
      // Remove from selected members
      setSelected(false);
      dispatch(removeSelectedMember({ department, teamMember }));
    } else {
      // Add to selected member
      setSelected(true);
      dispatch(addSelectedMember({ department, teamMember }));
    }
    dispatch(setMembersSelected());
  };
  const handleCardHover = (cardHover:boolean) => setCardHover(cardHover);

  const nameInitials = teamMember.firstName[0] + teamMember.lastName[0]

  return (
    <Grid item xs={4}>
      <Paper
        elevation={cardHover || selected ? 8 : 2}
        sx={{
          padding: '.5rem',
          cursor: 'pointer',
          background:
            'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 80%)',
          '&:hover': {
            background:
              'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 80%)',
          },
          ...((selected || allSelected) && {
            background:
            'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.1) 100%), #87cf3a',
            '&:hover': {
              background:
                'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,0.3) 100%), #87cf3a',
            },
          }),
        }}
        onMouseOver={() => {
          handleCardHover(true);
        }}
        onMouseLeave={() => {
          handleCardHover(false);
        }}
        onClick={handleSelected}
      >
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Avatar alt={nameInitials} sx={{ bgcolor: deepOrange[500] }}>
            {nameInitials}
          </Avatar>
          <Typography paragraph p={0} fontWeight={500} noWrap={true}>
            {teamMember.firstName} {teamMember.lastName}
          </Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}
export default ParticipantCard;