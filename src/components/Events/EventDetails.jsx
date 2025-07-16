import { alpha, Box, Paper, Typography, CardMedia, Avatar, AvatarGroup } from "@mui/material";
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
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
                height:370,
                width:310,
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
                                height: 120,
                                width: "90%",
                                objectFit: "cover",
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
                    
                    <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Typography variant="body1" color="initial" sx={{color:'#006affff',cursor:'pointer'}}>eventlink.co.il</Typography>
                        <AvatarGroup total={24}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                            />
                            <Avatar
                                alt="Travis Howard"
                                src="/static/images/avatar/2.jpg"
                            />
                            <Avatar
                                alt="Agnes Walker"
                                src="/static/images/avatar/4.jpg"
                            />
                            <Avatar
                                alt="Trevor Henderson"
                                src="/static/images/avatar/5.jpg"
                            />
                        </AvatarGroup>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
