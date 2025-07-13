import React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import AiMatching from './pages/AiMatching'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/Register' element={<Register />} />

                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='/members' element={<Members />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/connections' element={<Connections />} />
                        <Route path='/discover' element={<Discover />} />
                        <Route path='/aiMatching' element={<AiMatching />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
