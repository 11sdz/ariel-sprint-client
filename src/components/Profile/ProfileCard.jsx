import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import styles from "./style.module.scss";
import { getInitials } from "../../utils/Profile/profileUtils";

export default function ProfileCard({ profileData }) {
    const [profileGradient, setProfileGradient] = useState({
        initials: "",
        gender: profileData.gender,
    });

    useEffect(() => {
        setProfileGradient((prev) => ({
            ...prev,
            initials: getInitials(profileData.fullName),
            gender: profileData.gender, // optional: update gender if it changes
        }));
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
        <div className={styles.profileCard}>
            <ProfileImage gradient={profileGradient}/>
            <span className={styles.nameText}>{profileData.fullName}</span>
            <span className={styles.details}>{profileData.email}</span>
            <span className={styles.details}>
                {profileData.location.country}
                {", "}
                {profileData.location.city}
            </span>
            <span className={styles.link}>{profileData.linkedinURL}</span>
        </div>
    );
}
