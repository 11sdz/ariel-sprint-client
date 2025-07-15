import React, { useState } from "react";
import styles from "./style.module.scss";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Icon, IconButton, MenuItem, TextField } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { countries } from "./countries";
import { BsBorderWidth } from "react-icons/bs";

export default function ProfileForm({ formData, setFormData }) {
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    function handleChange(e) {
        const name = e.target.name; // e.g. "jobHistory.0.jobTitle"
        const value = e.target.value;

        if (name.includes(".")) {
            const keys = name.split("."); // ['jobHistory', '0', 'jobTitle']

            setFormData((prev) => {
                const updated = { ...prev };

                let pointer = updated;
                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    if (!pointer[key]) {
                        pointer[key] = isNaN(Number(keys[i + 1])) ? {} : [];
                    }
                    pointer = pointer[key];
                }

                pointer[keys[keys.length - 1]] = value;
                return updated;
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    return (
        <Box className={styles.formContainer}>
            <Box
                sx={{
                    color: "black",
                    margin: 1,
                }}
            >
                <IconButton onClick={() => setIsEditEnabled(!isEditEnabled)}>
                    {isEditEnabled ? (
                        <DoneOutlineIcon fontSize="large" />
                    ) : (
                        <EditNoteIcon fontSize="large" />
                    )}
                </IconButton>
            </Box>
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
                        type="tel"
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                        slotProps={{
                            htmlInput: {
                                inputMode: "numeric", // shows number pad on mobile
                                pattern: "[0-9]*", // restricts input to digits (0–9)
                                /*  maxLength: 10       // optional: limit input length */
                            }
                        }}
                    />
                    <TextField
                        select
                        label="Country"
                        name="location.country"
                        value={formData.location.country}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                        fullWidth
                    >
                        <MenuItem value="">Don't mention</MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.name}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </TextField>

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
                        name="jobHistory.0.jobTitle"
                        label="Job Title"
                        value={formData.jobHistory[0].jobTitle}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        name="jobHistory.0.companyName"
                        label="Company"
                        value={formData.jobHistory[0].companyName}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                    />
                </Box>
                <Box>
                    <TextField
                        variant="outlined"
                        type="text"
                        name="additionalInfo"
                        label="Bio"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        disabled={!isEditEnabled}
                        multiline={true}
                        rows={2}
                        sx={{ marginTop: 2, width: "50%" }}
                        maxRows={2}
                        inputProps={{ maxLength: 120 }} // limits total characters
                    />
                </Box>
            </Box>
        </Box>
    );
}
