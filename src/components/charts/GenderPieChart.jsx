import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const COLORS = ["#004484", "#F4A261", "#E76F51"];

export default function GenderPieChart({ data }) {
    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "'Poppins', sans-serif" , justifyContent: "center", textAlign: "center" }}
            >
                Gender Distribution
            </Typography>
            <ResponsiveContainer width="100%" minHeight={150} maxHeight={150}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        stroke="#fff"
                        strokeWidth={2}
                        label={false}
                        animationDuration={800}
                        animationEasing="ease-in-out"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#f5f5f5",
                            border: "none",
                            borderRadius: 8,
                        }}
                        itemStyle={{ color: "#333" }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={18}
                        wrapperStyle={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 14,
                            color: "#555",
                            marginTop: 12,
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}
