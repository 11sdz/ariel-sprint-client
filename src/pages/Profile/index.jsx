import React, { useState } from 'react';
import ProfileCard from '../../components/Profile/ProfileCard';
import styles from './style.module.scss';
import ProfileForm from '../../components/Profile/ProfileForm';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

export default function Index() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams();

    const {
        data: memberData,
    } = useApi(`/api/members/${id}`);

    const [profileForm, setProfileForm] = useState({
        id: '',
        full_name: '',
        email: '',
        city: '',
        phone: '',
        linkedin_url: '',
        facebook_url: '',
        wants_updates: false,
        gender: '',
        additional_info: '',
        experties: '',
        interests: '',
        job_history: [
            {
                role: '',
                company_name: '',
                start_date: '',
                end_date: '',
                description: '',
            },
        ],
        groups: [],
    });

    
    React.useEffect(() => {
        setProfileForm((prev) => ({
            ...prev,
            ...memberData,
        }));
    }, [memberData]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: isMobile ? 'center' : 'center',
                flexDirection: isMobile ? 'column' : 'column',
                gap: 1,
                padding: 2,
            }}
        >
            <ProfileCard profileData={profileForm} />
            <ProfileForm formData={profileForm} setFormData={setProfileForm} />
        </Box>
    );
}
