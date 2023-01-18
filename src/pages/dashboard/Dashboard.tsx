import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
// MaterialUI
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// Icons
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
// Components
import ToolBarMenu from './ToolBarMenu';
import MessageBadge from 'components/dashboard/MessageBadge';
import ProfileBadge from '../../components/dashboard/ProfileBadge';
//============================================================================//

// Drawer width
const drawerWidth = 200;
// Team Image
const opticImage =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/Teams/optic_square.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1658394449036';

//----------------------------------------------------------------------------//

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundImage: `url(${opticImage})`,
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: `calc(${drawerWidth}px - ${drawerWidth}px*0.1)`,
  height: '100vh',
  backgroundColor: 'fafafa'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'fafafa'
});

//----------------------------------------------------------------------------//

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//----------------------------------------------------------------------------//
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//----------------------------------------------------------------------------//

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));


//============================================================================//
type DashBoardProps = {
  children: JSX.Element | JSX.Element[];
};

export default function Dashboard({ children }: DashBoardProps) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{ borderBottom: '1px solid #e0e0e0' }}
      >
        <Toolbar
          sx={{
            backgroundColor: '#fff',
          }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: '#6c6d6d',
              marginRight: 1.5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <ToolBarMenu>
            <MessageBadge />
            <ProfileBadge />
          </ToolBarMenu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="h6"
            marginRight={'auto'}
            marginLeft={2}
            paddingRight={2}
            fontWeight={500}
          >
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ marginTop: '0' }}>
          {['events', 'calendar', 'team', 'fitness'].map((text, index) => (
            <Link
              key={text}
              to={'/dashboard/' + text}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: pathname.includes(text) ? '#d9d9d9' : '',
                  '&:hover': {
                    backgroundColor: pathname.includes(text) ? '#d9d9d9' : '',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {
                    [
                      <ScheduleIcon />,
                      <EventIcon />,
                      <GroupsIcon />,
                      <FitnessCenterIcon />,
                    ][index]
                  }
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, textTransform: 'capitalize' }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {/* Currently just memo/kanban after divider */}
          {['memo'].map((text, index) => (
            <Link
              key={text}
              to={'/dashboard/' + text}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ViewKanbanIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, textTransform: 'capitalize' }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      {/* 
        Arbitrarily set marginTop for scrollbar starting point.
        Check later if better solution to calculate height - AppBar height somehow.
      */}
      <Box
        sx={{
          marginTop: '4rem',
          paddingX: '2rem',
          width: '100%',
          overflowY: 'scroll',
        }}
      >
        <Grid
          container
          component="main"
          sx={{
            width: '100%',
            minWidth: '800px',
            maxWidth: '1100px',
            margin: '0 auto',
            marginBottom: '4rem',
          }}
        >
          <DrawerHeader />
          {children}
        </Grid>
      </Box>
    </Box>
  );
}