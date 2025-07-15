import React, { useState } from "react";
import styles from "./style.module.scss";
import { getInitials } from "../../utils/Profile/profileUtils";
import { Avatar, Typography } from "@mui/material";

export default function ProfileImage({ src,height, fullName }) {
    return (
        <Avatar
            className={styles.profileImage}
            sx={{
                width: height || 150,
                height: height || 150,
                alignItems: "center",
                backgroundImage:'linear-gradient(#3b82f6, #10b981)'
            }}
            alt={fullName}
            src={src}
        >
            <Typography variant="h3">{getInitials(fullName)}</Typography>
        </Avatar>
    );
}
