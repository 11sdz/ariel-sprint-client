import React, { useState } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import styles from "./style.module.scss";
import ProfileForm from "../../components/Profile/ProfileForm";

export default function Index() {
    const [profileForm, setProfileForm] = useState({
        fullName: "",
        email: "",
        location: { country: "", state: "", city: "" },
        phone: "",
        linkedinURL: "",
        facebookURL: "",
        wantsUpdates: false,
        gender: "",
        additionalInfo: "",
        jobs_history: [{role: "", companyName: "", startDate: "", endDate: ""}],
        years_of_experience: 0,
        wantsUpdates: false,
        groups: []
    });
    return (
        <div className={styles.root}>
            <ProfileCard profileData={profileForm} />
            <ProfileForm formData={profileForm} setFormData={setProfileForm} />
        </div>
    );
}
