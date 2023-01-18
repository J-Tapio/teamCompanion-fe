import { useState } from 'react';
// MaterialUI
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Redux
import { RootState, useSelector, useDispatch } from '../../store';
// Components
import TabPanel from './eventCreation/participantSelector/TabPanel';
import MemberTab from './eventCreation/participantSelector/MemberTab';

//============================================================================//

function a11yProps(index: number) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

//----------------------------------------------------------------------------//

interface ITabsProps {
  value: number;
  handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number,
  ) => void;
}

function SelectionTabs({ value, handleChange }: ITabsProps) {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="action tabs for categories of team members"
      sx={{
        '.MuiTabs-indicator': {
          color: '#000000',
          backgroundColor: '#87cf3a',
          height: '.2rem',
        },
        '& .MuiButtonBase-root': {
          color: '#000000',
        },
        '& .MuiButtonBase-root.Mui-selected': {
          color: '#000000',
        },
      }}
    >
      <Tab
        label="Athletes"
        {...a11yProps(0)}
        sx={{
          ...(value === 0 && {
            backgroundColor: '#f6f7f8',
          }),
        }}
      />
      <Tab
        label="Coaches"
        {...a11yProps(1)}
        sx={{
          ...(value === 1 && { backgroundColor: '#f6f7f8' }),
        }}
      />
      <Tab
        label="Fitness Coaches"
        {...a11yProps(2)}
        sx={{
          ...(value === 2 && { backgroundColor: '#f6f7f8' }),
        }}
      />
      <Tab
        label="Physiotherapists"
        {...a11yProps(3)}
        sx={{
          ...(value === 3 && { backgroundColor: '#f6f7f8' }),
        }}
      />
      <Tab
        label="Staff"
        {...a11yProps(4)}
        sx={{
          ...(value === 4 && { backgroundColor: '#f6f7f8' }),
        }}
      />
    </Tabs>
  );
}
//------------------------------------------------------------------------------

export default function ParticipantSelector() {
  const theme = useTheme();
  const { formStep } = useSelector((state: RootState) => state.events);
  const { teamMembers } = useSelector((state: RootState) => state.team);

  const [value, setValue] = useState(0);
  // Handle tab change
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      {formStep >= 1 && teamMembers && (
        <Paper elevation={2} sx={{ padding: '1rem' }}>
          <Typography variant="h4" fontWeight="500">
            Choose participants
          </Typography>
          <Box
            sx={{
              marginTop: '2rem',
              bgcolor: 'background.paper',
              position: 'relative',
              minHeight: 200,
            }}
          >
            <AppBar
              position="relative"
              sx={{
                backgroundColor: '#fff',
                color: '#000000',
                zIndex: '100',
              }}
            >
              <SelectionTabs value={value} handleChange={handleChange} />
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <MemberTab department={'athletes'} teamMembers={teamMembers.athletes} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <MemberTab department={'coaches'} teamMembers={teamMembers.coaches} />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <MemberTab department={'trainers'} teamMembers={teamMembers.trainers} />
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <MemberTab department={'physiotherapists'} teamMembers={teamMembers.physiotherapists} />
              </TabPanel>
              <TabPanel value={value} index={4} dir={theme.direction}>
                <MemberTab department={'staff'} teamMembers={teamMembers.staff} />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Paper>
      )}
    </>
  );
}
