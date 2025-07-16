import React, { useState } from "react";
import styles from "./style.module.scss";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, FormGroup, Icon, IconButton, MenuItem, Switch, TextField, Button, FormControlLabel } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { countries } from "./countries";
import { BsBorderWidth } from "react-icons/bs";
import { useApi } from "../../hooks/useApi";

export default function ProfileForm({ formData, setFormData }) {
    const [originalData, setOriginalData] = useState(formData);
    const [isEditEnabled, setIsEditEnabled] = useState(false);


    ///!!! gender groups experties interests and job history
    const { id,gender,experties,interests,job_history,groups, ...dataToSend } = formData;

    const { data, loading, error, refetch } = useApi(
        `/api/members/${formData.id}`,
        {
            method: "PATCH",
            body: dataToSend, // this must be updated before calling refetch
            immediate: false,
        }
    );

    const handleStartEdit = () => {
        setOriginalData(formData); // save current form values
        setIsEditEnabled(true);
    };

    const handleCancelEdit = () => {
        setFormData(originalData); // revert to original values
        setIsEditEnabled(false);
    };

    const handleSaveEdit = async () => {
        refetch()
        setIsEditEnabled(false)
    };

    function handleChange(e) {
        const name = e.target.name; // e.g. "jobHistory.0.jobTitle"
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

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
                <Box>
                    {isEditEnabled ? (
                        <>
                            <IconButton onClick={() => handleSaveEdit()}>
                                <DoneOutlineIcon
                                    fontSize="large"
                                    sx={{ color: "green" }}
                                />
                            </IconButton>
                            <IconButton onClick={() => handleCancelEdit()}>
                                <CancelIcon
                                    fontSize="large"
                                    sx={{ color: "red" }}
                                />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton onClick={() => handleStartEdit()}>
                            <EditNoteIcon fontSize="large" />
                        </IconButton>
                    )}
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
                            name="full_name"
                            label="Full Name"
                            value={formData.full_name}
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
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
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
                                },
                            }}
                        />
                        {/* <TextField
                            select
                            label="Country"
                            name="location.country"
                            value={formData.country}
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
                        </TextField> */}

                        <TextField
                            variant="outlined"
                            type="text"
                            name="city"
                            label="City"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!isEditEnabled}
                        />

                        <TextField
                            variant="outlined"
                            type="text"
                            name="linkedin_url"
                            label="Linkedin Profile"
                            value={formData.linkedin_url}
                            onChange={handleChange}
                            disabled={!isEditEnabled}
                        />

                        <TextField
                            variant="outlined"
                            type="text"
                            name="facebook_url"
                            label="Facebook Profile"
                            value={formData.facebook_url}
                            onChange={handleChange}
                            disabled={!isEditEnabled}
                        />

                        <TextField
                            variant="outlined"
                            type="text"
                            name="job_history.0.role"
                            label="Job Title"
                            value={formData.job_history[0]?.role}
                            onChange={handleChange}
                            disabled={!isEditEnabled}
                        />

                        <TextField
                            variant="outlined"
                            type="text"
                            name="job_history.0.company_name"
                            label="Company"
                            value={formData.job_history[0]?.company_name}
                            onChange={handleChange}
                            disabled={!isEditEnabled}
                        />
                            <FormControlLabel
                              label="Send me updates"
                              control={
                                <Switch
                                  value={formData.wants_updates}
                                  checked={formData.wants_updates}
                                  onChange={handleChange}
                                  name="wants_updates"
                                />
                              }
                              disabled={!isEditEnabled}
                            />
                    </Box>
                    <Box>
                        <TextField
                            variant="outlined"
                            type="text"
                            name="additional_info"
                            label="About Yourself"
                            value={formData.additional_info}
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
        </Box>
    );
}
