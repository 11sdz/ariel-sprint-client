
import React, { useState } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import styles from "./style.module.scss";
import ProfileForm from "../../components/Profile/ProfileForm";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function Index() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        experties:'',
        interests: "",
        jobHistory: [
            {
                jobTitle: "",
                companyName: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ],
        jobs_history: [{role: "", companyName: "", startDate: "", endDate: ""}],
        years_of_experience: 0,
        wantsUpdates: false,
        groups: []
    });
    return (
        <Box sx={{display:'flex',alignItems:isMobile? 'center': 'center', flexDirection: isMobile ? 'column' : 'column', gap: 2, padding: 2}}>
            <ProfileCard profileData={profileForm} />
            <ProfileForm formData={profileForm} setFormData={setProfileForm} />
        </Box>
    );
}