import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { toTitleCase } from "../../utils/textUtils";

export default function SummaryChart({ totalMembers, averageAge, averageYearExp,mostJobCommonTitle }) {
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        borderRadius: 3,
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Total Members */}
      <Box sx={{ textAlign: "center", flex: 1 }}>
        <PeopleIcon sx={{ fontSize: 48, color: "#4fc3fd", mb: 1 }} />
        <Typography variant="h5" fontWeight="700" color="#1976d2">
          {totalMembers}
        </Typography>
        <Typography variant='caption' color="text.secondary">
          Total Members
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Average Age */}
      <Box sx={{ textAlign: "center", flex: 1 }}>
        <CalendarTodayIcon sx={{ fontSize: 48, color: "#57fada", mb: 1 }} />
        <Typography variant="h5" fontWeight="700" color="#009688">
          {averageAge.toFixed(2)}
        </Typography>
        <Typography variant='caption' color="text.secondary">
          Average Age
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Average Experience */}
      <Box sx={{ textAlign: "center", flex: 1 }}>
        <WorkIcon sx={{ fontSize: 48, color: "#53ffba", mb: 1 }} />
        <Typography variant="h5" fontWeight="700" color="#388e3c">
          {averageYearExp.toFixed(2)}
        </Typography>
        <Typography variant='caption' color="text.secondary">
          Avg. Experience (years)
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Most Common Job Title */}
      <Box sx={{ textAlign: "center", flex: "1 1 200px" }}>
        <WorkOutlineIcon sx={{ fontSize: 48, color: "#ffa726", mb: 1 }} />
        <Typography variant="h6" fontWeight="700" color="#f57c00">
          {toTitleCase(mostJobCommonTitle) || "N/A"}
        </Typography>
        <Typography variant='caption' color="text.secondary">
          Most Common Job Title
        </Typography>
      </Box>
    </Box>
  );
}
