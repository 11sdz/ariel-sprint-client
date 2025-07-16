import { alpha, Box, Paper, Typography, CardMedia } from "@mui/material";
import React from "react";
import {
    formatDateShort,
    getColorForType,
} from "../../utils/Dashboard/eventsUtils";

export default function EventDetails({ eventDay }) {
    const bgColor = alpha(getColorForType(eventDay?.type) || "#000", 0.2); // 20% opacity
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: 3,
                maxWidth: "25%",
                bgcolor: bgColor,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box>
                    {eventDay?.event_img && (
                        <CardMedia
                            component="img"
                            image={eventDay.event_img}
                            alt={eventDay.event_name}
                            sx={{
                                borderRadius: 2,
                                height:120,
                                width:'100%',
                                objectFit: "cover",
                                ref
                            }}
                        />
                    )}
                    <Typography variant="h5" color="initial">
                        {eventDay?.event_name}
                    </Typography>
                    <Typography variant="h6" color="initial">
                        {formatDateShort(eventDay?.start_date)} to{" "}
                        {formatDateShort(eventDay.end_date)}
                    </Typography>
                    <Typography variant="h6" color="initial">
                        {'"'}
                        {eventDay?.descriptions}
                        {'"'}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
