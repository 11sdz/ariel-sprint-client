import React, { useState } from 'react';
import ProfileCard from '../../components/Profile/ProfileCard';
import styles from './style.module.scss';
import ProfileForm from '../../components/Profile/ProfileForm';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { dummyProfileData } from './profile';
import { useParams } from 'react-router-dom';

export default function Index() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams();

    const [profileForm, setProfileForm] = useState({
        id: '',
        fullName: '',
        email: '',
        location: { country: '', state: '', city: '' },
        phone: '',
        linkedinURL: '',
        facebookURL: '',
        wantsUpdates: false,
        gender: '',
        additionalInfo: '',
        experties: '',
        interests: '',
        jobHistory: [
            {
                jobTitle: '',
                companyName: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ],
        jobs_history: [{ role: '', companyName: '', startDate: '', endDate: '' }],
        years_of_experience: 0,
        groups: [],
    });

    React.useEffect(() => {
        setProfileForm((prev) => ({
            ...prev,
            ...dummyProfileData,
        }));
    }, []);

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
