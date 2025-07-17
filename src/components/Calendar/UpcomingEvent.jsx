import React from "react";
import { getNextUpcomingEvent } from "../../utils/Dashboard/eventsUtils";
import { Box, Paper, Typography } from "@mui/material";

export default function UpcomingEvent({ events,setDay }) {
    if(!events){
        return 
    }

    const { nextEvent, daysUntil } = getNextUpcomingEvent(events);

    return (
        <Box onClick={()=>setDay(nextEvent)}>
            <Paper
                sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    p: 1,
                    height: 192,
                    width: 165,
                    borderRadius: "8px",
                    boxShadow: 3,
                    marginLeft: 1,
                }}
            >
                <Typography sx={{ fontWeight: "bolder" }}>
                    Upcoming Event
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: "bolder" , color:'#2600feff'}}>
                    {nextEvent?.event_name}
                </Typography>
                <Typography sx={{ fontSize: 60 }}>{daysUntil}</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: "bolder" }}>
                    Days
                </Typography>
            </Paper>
        </Box>
    );
}
