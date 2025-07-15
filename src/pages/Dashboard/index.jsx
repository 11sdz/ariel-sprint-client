import React from "react";
import DashboardCard from "../../Dashboard/DashboardCard";
import styles from "./style.module.scss";
import { members } from "../Members/members";
import GenderPieChart from "../../components/charts/GenderPieChart";
import { Box, Typography } from "@mui/material";


const dummyCommunityData = {
    title: "Community Engagement",
    members: members,
    totalMembers: members.length,
};

export default function index() {
    const totalMembers = members.length;

    const totalExperience = members.reduce(
        (sum, m) => sum + m.years_of_experience,
        0
    );

    const avgExperience = (totalExperience / totalMembers).toFixed(1);

    // Count job titles
    const jobTitleCounts = members.reduce((acc, member) => {
        member.jobHistory.forEach((job) => {
            const title = job.jobTitle?.toLowerCase() || "unknown";
            acc[title] = (acc[title] || 0) + 1;
        });
        return acc;
    }, {});

    const mostCommonTitle =
        Object.entries(jobTitleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "N/A";

    // Count genders
    const genderCounts = members.reduce((acc, member) => {
        const gender = member.gender?.toLowerCase() || "unknown";
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
    }, {});

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
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
                    title={dummyCommunityData.title}
                    amount={dummyCommunityData.totalMembers}
                    precentChange={10}
                    description={"Total Members"}
                >
                </DashboardCard>
            </Box>
            <div className={styles.membersContainer}>
                {dummyCommunityData.members.map((member) => (
                    <div key={member.id} className={styles.memberCard}>
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </Box>
    );
}
