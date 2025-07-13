import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import styles from "./style.module.scss";
import { getInitials } from "../../utils/Profile/profileUtils";

export default function ProfileCard() {
    const [name, setName] = useState("Alice Bob");
    const [email, setEmail] = useState("johnDoe@gmail.com");
    const [location, setLocation] = useState("Pikesville, MD");
    const [linkedin, setLinkedin] = useState("Linkedin profile");
    const [imageSrc, setImageSrc] = useState(""); // empty for fallback initials
    const [initials, setInitials] = useState(getInitials(name));

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
            <ProfileImage src={imageSrc} initials={initials} />
            <span className={styles.nameText}>{name}</span>
            <span className={styles.details}>{email}</span>
            <span className={styles.details}>{location}</span>
            <span className={styles.link}>{linkedin}</span>
        </div>
    );
}
