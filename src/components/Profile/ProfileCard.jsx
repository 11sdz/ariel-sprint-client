import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import styles from "./style.module.scss";
import { getInitials } from "../../utils/Profile/profileUtils";
import { Box } from "@mui/material";

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
                        <ProfileImage fullName={profileData.fullName} />
                        <Box
                            sx={{
                                padding: 3,
                                flexDirection: "column",
                                display: "flex",
                                alignItems: "baseline",
                            }}
                        >
                            <span className={styles.nameText}>
                                {profileData.fullName}
                            </span>
                            <span className={styles.details}>
                                {profileData.jobHistory[0].jobTitle}
                                {profileData.jobHistory[0].companyName &&
                                    `, ${profileData.jobHistory[0].companyName}`}
                            </span>
                            <span className={styles.details}>
                                {profileData.email}
                            </span>
                            <span className={styles.details}>
                                <span>
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
                        }}
                    >
                        <span className={styles.nameText}>
                            {profileData.fullName}
                        </span>

                        <span className={styles.details}>
                            {profileData.additionalInfo}
                        </span>
                        <span className={styles.link}>
                            {profileData.linkedinURL}
                        </span>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
