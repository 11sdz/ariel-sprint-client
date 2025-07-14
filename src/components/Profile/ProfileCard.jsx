import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import styles from "./style.module.scss";
import { getInitials } from "../../utils/Profile/profileUtils";
import { Box } from "@mui/material";

export default function ProfileCard({ profileData }) {


    useEffect(() => {
    }, [profileData.fullName, profileData.gender]);

    // profileName,
    // phone,
    // email,
    // location,
    // position,
    // company,
    // linkedinURL,
    // description,
    // interests,
    // experties
    return (
        <Box className={styles.profileCard}>
            <ProfileImage fullName={profileData.fullName} />
            <span className={styles.nameText}>{profileData.fullName}</span>
            <span className={styles.details}>{profileData.email}</span>
            <span className={styles.details}>
                {profileData.location.country}
                {", "}
                {profileData.location.city}
            </span>
            <span className={styles.link}>{profileData.linkedinURL}</span>
        </Box>
    );
}
