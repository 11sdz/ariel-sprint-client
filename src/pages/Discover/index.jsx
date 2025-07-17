import React, { useState } from "react";
import { members } from "../Members/members";
import { Box, Typography } from "@mui/material";
import { useApi } from "../../hooks/useApi";
import EventDetails from "../../components/Events/EventDetails";

import ExploreIcon from "@mui/icons-material/Explore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const dummyCommunityData = {
    title: "Community Engagement",
    members: members,
    totalMembers: members.length,
};

/**
 * events:{
 *  title,
 *  start_date,
 *  end_date,
 *  description
 *  type
 * }
 *
 *
 */

export default function index() {
    const [day, setDay] = useState(new Date());

    const {
        data: eventsData,
        loading: eventsLoading,
        error: eventsError,
        refetch: refetchEvents,
    } = useApi("/api/events");

    console.log(eventsData, "THIS IS EVENTS DATA");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                //alignItems:'center',
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                }}
            >
                <TravelExploreIcon color="primary" fontSize="large" />
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Discover All Events
                </Typography>
                <ExploreIcon color="secondary" fontSize="large" />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {eventsData &&
                    eventsData.map((communityEvent) => (
                        <Box
                            key={communityEvent.id}
                            sx={{
                                width: "310px", // fixed width
                            }}
                        >
                            <EventDetails id={communityEvent.id} />
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}
