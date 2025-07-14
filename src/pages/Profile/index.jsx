
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
        position: "",
    });
    return (
        <Box sx={{display:'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, padding: 2}}>
            <ProfileCard profileData={profileForm} />
            <ProfileForm formData={profileForm} setFormData={setProfileForm} />
        </Box>
    );
}