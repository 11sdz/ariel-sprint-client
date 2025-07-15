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

    useEffect(() => {}, [profileData.full_name, profileData.gender]);
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
                            <span className={styles.details} style={{ color: '#001c5fff' }}>
                                {profileData.job_history?.[0] && (
                                    <span className={styles.details} style={{ color: '#001c5fff' }}>
                                        {profileData.job_history[0].role}
                                        {profileData.job_history[0].company_name &&
                                            `, ${profileData.job_history[0].company_name}`}
                                    </span>
                                )}
                            </span>
                            <span className={styles.details} style={{ color: '#5a5a5aff' }}>
                                <EmailIcon sx={{ my: -1 }} />
                                {profileData.email}
                            </span>
                            <span
                                className={styles.details}
                                style={{ color: "#4f4f4fff" }}
                            >
                                <EmailIcon sx={{ my: -1 }} />
                                {profileData.email}
                            </span>
                            <span className={styles.details}
                            style={{
                                    color: "#5a5a5aff",
                                    fontSize: "1rem", // smaller text
                                    display: "inline-flex", // align icon and text nicely
                                    alignItems: "center",
                                    gap: "4px",
                                }}>
                                <span>
                                    <LocationOnIcon sx={{ my: -1 }} />
                                    {profileData.country?.country_name}
                                    {profileData.city && `, ${profileData.city}`}
                                </span>
                            </span>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            padding: 3,
                            flexDirection: "column",
                            display: "flex",
                            alignItems: "baseline",
                            transform: "scaleX(-1)",
                            gap:0.3
                        }}
                    >
                        <span className={styles.nameText}>{profileData.full_name}</span>

                        <span className={styles.details}>
                            {profileData.additionalInfo}
                        </span>
                        <span className={styles.link}>
                            <LinkedInIcon sx={{ my: -1 }} />
                            {profileData.linkedin_url}
                        </span>
                                                    <span
                                className={styles.details}
                                style={{
                                    color: "#5a5a5aff",
                                    fontSize: "0.8rem", // smaller text
                                    display: "inline-flex", // align icon and text nicely
                                    alignItems: "center",
                                    gap: "4px",
                                }}
                            >
                                <PhoneIcon sx={{my:-1}}/>
                                {profileData.phone}
                            </span>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
