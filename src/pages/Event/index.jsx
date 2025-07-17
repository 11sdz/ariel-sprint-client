import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import EventParticipantsTable from "../../components/Events/EventParticipantsTable";
import { useState } from "react";
import { formatRange } from "../../utils/Dashboard/eventsUtils";

export default function EventPage() {
    const { id } = useParams();
    const { data: eventDay , refetch } = useApi(`/api/events/${id}`);
    const handleStatusChange= async ()=>{
        refetch()

    }

    if (!eventDay) return <Box>Didnt find any event</Box>;
    return (
        <Box sx={{ p: 3 }}>
            {/* Cover Image */}
            <Box
                sx={{
                    height: 240,
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
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            fontWeight: "bolder",
                        }}
                    >
                        {eventDay.event_name}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            fontWeight: "bolder",
                        }}
                    >
                        {formatRange(eventDay?.start_date, eventDay?.end_date)}
                    </Typography>
                </Box>
            </Box>

            {/* Event Description */}
            {eventDay.descriptions && (
                <Box
                    sx={{
                        mb: 4,
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "background.paper",
                        boxShadow: 1,
                        color: "text.primary",
                        whiteSpace: "pre-line", // respects line breaks if any
                        fontSize: 16,
                        lineHeight: 1.5,
                    }}
                >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        About this event
                    </Typography>
                    <Typography>{eventDay.descriptions}</Typography>
                </Box>
            )}

            <EventParticipantsTable
                participants={eventDay.participants}
                eventId={eventDay.id}
                onStatusChange={handleStatusChange}
            />
        </Box>
    );
}
