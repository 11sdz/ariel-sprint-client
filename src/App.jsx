// ariel-sprint-client/src/App.jsx
import React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Profile from './pages/Profile'
import Login from './pages/Login/Login'
import LinkedInCallback from './pages/LinkedInCallback/LinkedInCallback'
import Register from './pages/Register'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import AiMatching from './pages/AiMatching'
import Event from './pages/Event'

import { Box, useMediaQuery, useTheme } from '@mui/material';


export default function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Box component="main" sx={{paddingBottom: isMobile ? '70px' : '0px'}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path="/linkedin/callback" element={<LinkedInCallback />} />
                    <Route path='/Register' element={<Register />} />

                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='/members' element={<Members />} />
                        <Route path='/profile/:id' element={<Profile />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/connections' element={<Connections />} />
                        <Route path='/discover' element={<Discover />} />
                        <Route path='/aiMatching' element={<AiMatching />} />
                        <Route path='/event/:id' element={<Event />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Box>
    );
}
