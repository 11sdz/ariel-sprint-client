import React from "react";
import { Fab, Chip, Stack, Box, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import ReplayIcon from "@mui/icons-material/Replay"; // for toggle
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useApi } from "../../hooks/useApi";

export default function ChangeStatus({ eventId, id, status, email, phone,onStatusChange }) {
    const { mutate } = useApi(`/api/events/${eventId}/participants/${id}`, {
        method: "PATCH",
        immediate: false,
    });

    const handleStatusChange = async (newStatus) => {
        await mutate({ status: newStatus });
        if(onStatusChange) onStatusChange()
    };

    const handleSendEmail = () => {
        // Your email sending logic here
        window.location.href = `mailto:${email}?subject=Regarding your participation&body=Hello,`;
    };

    const handleSendWhatsApp = () => {
        const message = encodeURIComponent(
            "Hello, regarding your participation..."
        );
        const phoneNumber = phone.replace(/\D/g, ""); // Remove any non-digit chars
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <Stack direction="column" spacing={1} alignItems="center">
            {/* Status Badge */}
            <Chip
                label={status.toUpperCase()}
                sx={{boxShadow:3}}
                color={
                    status === "coming"
                        ? "success"
                        : status === "pending"
                        ? "warning"
                        : status === "rejected"
                        ? "error"
                        : status === "maybe"
                        ? "info"
                        : "default"
                }
                size="medium"
            />

            {/* Buttons */}
            {status === "pending" && (
                <Box sx={{ display: "flex", gap: 1,flexDirection:'row' }}>
                    <Tooltip title="Accept">
                        <Fab
                            color="success"
                            size="small"
                            onClick={() => handleStatusChange("coming")}
                        >
                            <CheckIcon />
                        </Fab>
                    </Tooltip>

                    <Tooltip title="Reject">
                        <Fab
                            color="error"
                            size="small"
                            onClick={() => handleStatusChange("rejected")}
                        >
                            <CloseIcon />
                        </Fab>
                    </Tooltip>
                </Box>
            )}

            {status === "maybe" && (
                <Box sx={{ display: "flex", gap: 1,flexDirection:'row' }}>
                    <Tooltip title="Send Email">
                        <Fab
                            color="primary"
                            size="small"
                            onClick={handleSendEmail}
                        >
                            <EmailIcon />
                        </Fab>
                    </Tooltip>
                    <Tooltip title="Send Email">
                        <Fab
                            sx={{color:'green'}}
                            size="small"
                            onClick={handleSendWhatsApp}
                        >
                            <WhatsAppIcon />
                        </Fab>
                    </Tooltip>
                </Box>
            )}

            {status === "rejected" && (
                <Tooltip
                    title={`Mark as ${
                        status === "coming" ? "Rejected" : "Coming"
                    }`}
                >
                    <Fab
                        color={status === "coming" ? "success" : "error"}
                        size="small"
                        onClick={() =>
                            handleStatusChange(
                                status === "coming" ? "rejected" : "coming"
                            )
                        }
                    >
                        <ReplayIcon />
                    </Fab>
                </Tooltip>
            )}
        </Stack>
    );
}
