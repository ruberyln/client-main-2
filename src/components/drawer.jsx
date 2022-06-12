import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Context } from '../userContext/Context';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import {useNavigate} from "react-router-dom"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

export default function MiniDrawer({fetchPosts}) {
  const navigate=useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const {dispatch} = useContext(Context);
  const handleLogout = () =>{
    localStorage.clear()
    dispatch({type : "LOGOUT"})
    navigate("/")
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open} color="secondary">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div"  style={{"cursor":'pointer'}} onClick={() =>{
                navigate("/")
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              } >
          
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['Home'].map((text) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 80,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              cursor="pointer" onClick={() =>{
                navigate("/")
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              }
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
               <HomeIcon />

              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {['Upload'].map((text,) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 80,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link}
              href={"/upload "}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <CameraAltOutlinedIcon  />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {['Profile'].map((text,) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 80,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link}
              href={"/profile"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
              <PersonOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>   <List>
        {['Suggestions'].map((text,) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 80,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link}
             href= {"/suggestion"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <PersonAddAltIcon />

              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {['Logout'].map((text,) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 200,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link}
              onClick = {handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <PowerSettingsNewOutlinedIcon />

              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Drawer>

      </Box>
  );
}
