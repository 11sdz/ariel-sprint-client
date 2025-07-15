import React from "react";
import DashboardCard from "../../Dashboard/DashboardCard";
import styles from "./style.module.scss";
import { members } from "../Members/members";
import GenderPieChart from "../../components/charts/GenderPieChart";
import { Box, Typography } from "@mui/material";
import SummaryChart from "../../components/charts/SummaryChart";
import MyCalendar from "../../components/Calendar/MyCalendar";


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
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding:'20px'
            }}
        >
            <Box sx={{display:'flex',backgroundColor:'red',flexDirection:'row'}}>
                <MyCalendar/>
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
