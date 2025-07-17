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
    const [day,setDay] = useState(new Date())

    const {
            data: eventsData,
            loading: eventsLoading,
            error: eventsError,
            refetch: refetchEvents,
        } = useApi('/api/events');

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding:'20px',
                //alignItems:'center',
                gap:2
            }}
        >
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <MyCalendar events={eventsData} setDay={setDay}/>
                <UpcomingEvent events={eventsData} setDay={setDay}/>
                <CreateEvent/>
            </Box>

            <Box>
                {eventsData && getEventsForDate(day,eventsData)[0] && <EventDetails id={getEventsForDate(day,eventsData)[0].id}/>}
            </Box>




            {/* <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <DashboardCard type={"pie"}>
                    <GenderPieChart data={genderCounts} />
                </DashboardCard>
                <DashboardCard
                    title={"Summary"}
                >
                    <SummaryChart averageAge={averageAge} totalMembers={totalMembers} averageYearExp={4.566} mostJobCommonTitle={mostCommonTitle}/>

                </DashboardCard>
            </Box>
            <div className={styles.membersContainer}>
                {dummyCommunityData.members.map((member) => (
                    <div key={member.id} className={styles.memberCard}>
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div> */}
        </Box>
    );
}
