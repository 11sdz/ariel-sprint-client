import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Drawer, Stack, Typography } from '@mui/material';

export default function Navbar() {
  const navbarItems = [
    { label: "Dashboard", href: "/" },
    { label: "Members", href: "/members" },
    { label: "Profile", href: "/profile" },
    { label: "Connections", href: "/connections" },
    { label: "Discover", href: "/discover" },
    { label: "AI Matching", href: "/aiMatching" },
  ];

  return (
    <Box 
      component="nav"
      sx={{
        width: '15vw',
        height: '100vh',
        bgcolor: 'white',
        borderRadius: '10px',
        p: 2,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Drawer
        variant="permanent"
        anchor='left'
        >
      {navbarItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          end={item.href === "/"}
          style={({ isActive }) => ({
            textDecoration: 'none',
          })}
        >
          {({ isActive }) => (
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: '25px',
                fontWeight: isActive ? 'bold' : 'normal',
                bgcolor: isActive
                  ? 'linear-gradient(to right, #003366, #3399FF)'
                  : 'transparent',
                color: isActive ? 'white' : 'black',
                boxShadow: isActive ? 3 : 'none',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 4,
                  color: 'black',
                },
              }}
            >
              <Typography variant="body1">{item.label}</Typography>
            </Box>
          )}
        </NavLink>
      ))}
      </Drawer>
    </Box>
  );
}
