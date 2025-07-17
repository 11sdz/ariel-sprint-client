import React, { useEffect, useState } from 'react';
import ProfileImage from './ProfileImage';
import styles from './style.module.scss';
import { Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ProfileCard({ profileData }) {
    const [flipped, setFlipped] = useState(false);

    console.log("DATA of profile",profileData)

    useEffect(() => {}, [profileData.full_name, profileData.gender]);

    const job = profileData.job_history?.[0];

    return (
        <Box
            sx={{
                position: 'relative',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'none',
                flexDirection: 'row',
            }}
        >
            <Box className={styles.profileCard} onClick={() => setFlipped(!flipped)}>
                {!flipped ? (
                    <>
                        {(profileData.fullName || profileData.profile_img) && (
                            <ProfileImage src={profileData.profile_img} fullName={profileData.full_name} />
                        )}
                        <Box
                            sx={{
                                padding: 3,
                                flexDirection: 'column',
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: 0.5,
                            }}
                        >
                            <span className={styles.nameText}>{profileData.full_name}</span>

                            {job && (
                                <span className={styles.details} style={{ color: '#001c5fff' }}>
                                    {job.role}
                                    {job.company_name && `, ${job.company_name}`}
                                </span>
                            )}
                        
                            <span className={styles.details} style={{ color: '#4f4f4fff' }}>
                                <EmailIcon sx={{ my: -1 }} />
                                {profileData.email}
                            </span>
                            <span
                                className={styles.details}
                                style={{
                                    color: '#5a5a5aff',
                                    fontSize: '1rem', // smaller text
                                    display: 'inline-flex', // align icon and text nicely
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                <span>
                                    <LocationOnIcon sx={{ my: -1 }} />
                                    {/* {profileData.location.country} */}
                                    {/*profileData.city && `, ${profileData.city}`*/}
                                    {profileData.city}
                                </span>
                            </span>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            padding: 3,
                            flexDirection: 'column',
                            display: 'flex',
                            alignItems: 'baseline',
                            transform: 'scaleX(-1)',
                            gap: 0.3,
                        }}
                    >
                        <span className={styles.nameText}>{profileData.full_name}</span>

                        <span
                            className={styles.details}
                            style={{
                                color: '#110000ff',
                                fontSize: '1.1rem', // smaller text
                                display: 'inline-flex', // align icon and text nicely
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 'bolder',
                            }}
                        >
                            {'"'}{profileData.additional_info}{'"'}
                        </span>
                        <span
                            className={styles.details}
                            style={{
                                color: '#082cfbff',
                                fontSize: '1rem', // smaller text
                                display: 'inline-flex', // align icon and text nicely
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 'bold',
                            }}
                        >
                            <LinkedInIcon sx={{ my: -1 }} />
                            {profileData.linkedin_url}
                        </span>
                        <span
                            className={styles.details}
                            style={{
                                color: '#474747ff',
                                fontSize: '1rem', // smaller text
                                display: 'inline-flex', // align icon and text nicely
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 'bolder',
                            }}
                        >
                            <PhoneIcon sx={{ my: -1 }} />
                            {profileData.phone}
                        </span>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
