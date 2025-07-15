import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import styles from "./style.module.scss";
import { Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";

export default function ProfileCard({ profileData }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {}, [profileData.fullName, profileData.gender]);

    return (
        <Box
            sx={{
                position: "relative",
                transition: "transform 0.6s",
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "none",
                flexDirection: "row",
            }}
        >
            <Box
                className={styles.profileCard}
                onClick={() => setFlipped(!flipped)}
            >
                {!flipped ? (
                    <>
                        {(profileData.fullName || profileData.profileImage) && (
                            <ProfileImage
                                src={profileData.profileImage}
                                fullName={profileData.fullName}
                            />
                        )}
                        <Box
                            sx={{
                                padding: 3,
                                flexDirection: "column",
                                display: "flex",
                                alignItems: "baseline",
                                gap:0.5
                            }}
                        >
                            <span className={styles.nameText}>
                                {profileData.fullName}
                            </span>
                            <span
                                className={styles.details}
                                style={{ color: "#001c5fff" }}
                            >
                                {profileData.jobHistory[0].jobTitle}
                                {profileData.jobHistory[0].companyName &&
                                    `, ${profileData.jobHistory[0].companyName}`}
                            </span>
                            <span
                                className={styles.details}
                                style={{ color: "#5a5a5aff" }}
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
                                    {profileData.location.country}
                                    {profileData.location.city &&
                                        `, ${profileData.location.city}`}
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
                        <span className={styles.nameText}>
                            {profileData.fullName}
                        </span>

                        <span className={styles.details}>
                            {profileData.additionalInfo}
                        </span>
                        <span className={styles.link}>
                            <LinkedInIcon sx={{ my: -1 }} />
                            {profileData.linkedinURL}
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
