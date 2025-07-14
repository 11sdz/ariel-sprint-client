import React, { useState } from "react";
import styles from "./style.module.scss";
import Button from "@mui/material/Button";
import { Box, MenuItem, TextField } from "@mui/material";

export default function ProfileForm({ formData, setFormData }) {
    const [isEditEnabled, setIsEditEnabled] = useState(true);
    function handleChange(e) {
        const name = e.target.name; // e.g. "location.country"
        const value = e.target.value;

        if (name.includes(".")) {
            const keys = name.split("."); // ["location", "country"]

            setFormData((prev) => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0]],
                    [keys[1]]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    return (
        <Box className={styles.formContainer}>
            <Button
                variant={"contained"}
                onClick={() => setIsEditEnabled(!isEditEnabled)}
            >
                {isEditEnabled ? "Disable Edit" : "Enable Edit"}
            </Button>

            <Box className={styles.profileForm}>
                <Box
                    component={"form"}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <TextField
                        variant="outlined"
                        type="text"
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        type="email"
                        name="email"
                        label="Email" // acts as placeholder and label
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                        variant="outlined" // optional, default is outlined
                    />

                    <TextField
                        variant="outlined"
                        type="phone"
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        name="linkedinURL"
                        label="Linkedin Profile"
                        value={formData.linkedinURL}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        name="facebookURL"
                        label="Facebook Profile"
                        value={formData.facebookURL}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        name="location.country"
                        label="Country"
                        value={formData.location.country}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        name="location.state"
                        label="State"
                        value={formData.location.state}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        name="location.city"
                        label="City"
                        value={formData.location.city}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                        fullWidth
                    >
                        <MenuItem value="">Don't mention</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                </Box>
            </Box>
        </Box>
    );
}
