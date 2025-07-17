import React, { useState } from "react";
import DashboardCard from "../../Dashboard/DashboardCard";
import styles from "./style.module.scss";
import { members } from "../Members/members";
import GenderPieChart from "../../components/charts/GenderPieChart";
import { Box, Typography } from "@mui/material";
import SummaryChart from "../../components/charts/SummaryChart";
import MyCalendar from "../../components/Calendar/MyCalendar";
import UpcomingEvent from "../../components/Calendar/UpcomingEvent";
import { mockEvents } from "../../components/Calendar/events";
import CreateEvent from "../../components/Calendar/CreateEvent";
import { useApi } from "../../hooks/useApi";
import EventDetails from "../../components/Events/EventDetails";
import { getEventsForDate } from "../../utils/Dashboard/eventsUtils";

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
