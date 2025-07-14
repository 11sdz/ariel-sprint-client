import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LinkIcon from '@mui/icons-material/Link';
import ExploreIcon from '@mui/icons-material/Explore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const navbarItems = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon /> },
  { label: "Members", href: "/members", icon: <PeopleIcon /> },
  { label: "Profile", href: "/profile", icon: <AccountBoxIcon /> },
  { label: "Connections", href: "/connections", icon: <LinkIcon /> },
  { label: "Discover", href: "/discover", icon: <ExploreIcon /> },
  { label: "AI Matching", href: "/aiMatching", icon: <AutoAwesomeIcon /> },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sidebarWidth = expanded ? 200 : 64;

  return (
    <Box
      component="nav"
      sx={{
        height: '100vh',
        width: sidebarWidth,
        bgcolor: '#fff',
        p: 2,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s',
        position: isMobile ? 'fixed' : 'relative',
        zIndex: 1200,
      }}
    >
      {/* Toggle Button */}
      {!isMobile && (
        <IconButton onClick={() => setExpanded(!expanded && !isMobile)} sx={{ mb: 2 }}>
          <MenuIcon />
        </IconButton>
      )}

      {/* Navigation Items */}
      {navbarItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          end={item.href === "/"}
          style={({ isActive }) => ({
            textDecoration: 'none',
          })}
          onClick={() => {
            if (!isMobile) {
              setExpanded(false);
            }
          }}
        >
          {({ isActive }) => (
            <Tooltip title={!expanded ? item.label : ''} placement="right" >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  //justifyContent: 'center',
                  alignContent: 'center',
                  gap: 2,
                  px: 0,
                  py: 1,
                  mb: 1,
                  borderRadius: '25px',
                  fontWeight: isActive ? 'bold' : 'normal',
                  backgroundImage: isActive
                    ? 'linear-gradient(to right, #003366, #3399FF)'
                    : 'transparent',
                  color: isActive ? 'white' : 'black',
                  cursor: 'pointer',
                  boxShadow: isActive ? 3 : 'none',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    color: 'black',
                  },
                }}
              >
                {React.cloneElement(item.icon,{
                  sx: {
                    marginLeft: expanded ? 1 : 0.5,
                  }
                })}
                {expanded && <Typography sx={{ color: isActive ? 'white' : 'black', variant: "body1" }}>{item.label}</Typography>}
              </Box>
            </Tooltip>
          )}
        </NavLink>
      ))}
    </Box>
  );
}
