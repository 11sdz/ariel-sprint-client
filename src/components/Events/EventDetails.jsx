import {
    alpha,
    Box,
    Paper,
    Typography,
    CardMedia,
    Avatar,
    AvatarGroup,
    Tooltip,
} from "@mui/material";
import React from "react";
import {
    formatDateShort,
    formatRange,
    getColorForType,
} from "../../utils/Dashboard/eventsUtils";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function EventDetails({ id }) {
    const { data: eventDay } = useApi(`/api/events/${id}`);

    const nav = useNavigate();

    if (!eventDay) return null; // or show a loader/spinner

    function handleOpenEventPage(id) {
        nav(`/event/${id}`);
    }

    const bgColor = alpha(getColorForType(eventDay?.type) || "#000", 0.2); // 20% opacity
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
                height: 370,
                width: 310,
                bgcolor: bgColor,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                }}
                onClick={() => handleOpenEventPage(id)}
            >
                <Box>
                    {eventDay?.event_img && (
                        <CardMedia
                            component="img"
                            image={eventDay.event_img}
                            alt={eventDay.event_name}
                            sx={{
                                borderRadius: 2,
                                height: 120,
                                width: "90%",
                                objectFit: "cover",
                            }}
                        />
                    )}
                    <Typography
                        variant="h6"
                        color="initial"
                        sx={{ fontWeight: "bolder" }}
                    >
                        {eventDay?.event_name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#474747" }}>
                        {formatRange(eventDay?.start_date, eventDay?.end_date)}
                    </Typography>
                    <Paper
                        elevation={0.5}
                        sx={{
                            bgcolor: "#b2b2b24f",
                            fontStyle: "italic",
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 500,
                                fontStyle: "italic",
                                color: "text.secondary",
                            }}
                        >
                            “{eventDay?.descriptions}”
                        </Typography>
                    </Paper>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Typography
                            variant="body1"
                            color="initial"
                            sx={{ color: "#006affff", cursor: "pointer" }}
                        >
                            eventlink.co.il
                        </Typography>
                        <AvatarGroup max={4}>
                            {eventDay.participants?.map((p) => {
                                return (
                                    <>
                                        {p.status === "coming" && (
                                            <Tooltip
                                                key={p.id}
                                                title={p.member.full_name}
                                                arrow
                                            >
                                                <Avatar
                                                    alt={p.member.full_name}
                                                    src={p.member.profile_img}
                                                    sx={{ cursor: "pointer" }}
                                                />
                                            </Tooltip>
                                        )}
                                    </>
                                );
                            })}
                        </AvatarGroup>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
