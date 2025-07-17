import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import EventParticipantsTable from "../../components/Events/EventParticipantsTable";

export default function EventPage() {
    const { id } = useParams();
    const { data: eventDay } = useApi(`/api/events/${id}`);

    if (!eventDay) return <Box>Didnt find any event</Box>;
    return (
        <Box sx={{p:3}}>
            {/* Cover Image */}
            <Box
                sx={{
                    height: 220,
                    backgroundImage: `url(${eventDay.event_img})`, // Replace with your eventDay.event_img
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 4,
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    px: 3,
                    py: 2,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.5)", // fallback if image fails
                    position: "relative",
                }}
            >
                {/* Optional Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0,0,0,0))",
                        borderRadius: 4,
                    }}
                />
                <Typography
                    variant="h4"
                    sx={{ position: "relative", zIndex: 1, fontWeight:'bolder' }}
                >
                    {eventDay.event_name}
                </Typography>
            </Box>

            <EventParticipantsTable participants={eventDay.participants}/>
        </Box>
    );
}
