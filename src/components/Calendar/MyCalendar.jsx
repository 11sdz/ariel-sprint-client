import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Paper,
    Button,
    IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const formatDay = (day, selectedDate) => ({
    textAlign: "center",
    cursor: "pointer",
    p: 1,
    height: 100,
    width: 165,
    borderRadius: "8px",
    bgcolor: day.isSame(selectedDate, "day") ? "primary.main" : "transparent",
    color: day.isSame(selectedDate, "day") ? "white" : "text.primary",
    "&:hover": { bgcolor: "primary.light", color: "white" },
});

const eventColors = {
    meeting: "#4caf50", // green
    training: "#2196f3", // blue
    holiday: "#f44336", // red
    default: "#9e9e9e", // gray
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
const mockEvents = [
  {
    title: "AI & ML Meetup",
    start_date: "2025-07-21T18:00:00",
    end_date: "2025-07-21T20:00:00",
    description: "Discuss latest trends in AI and machine learning.",
    type: "meetup",
  },
  {
    title: "Web3 Hackathon Kickoff",
    start_date: "2025-07-24T10:00:00",
    end_date: "2025-07-24T22:00:00",
    description: "24-hour Web3 hackathon opening event.",
    type: "hackathon",
  },
  {
    title: "Cloud Security Webinar",
    start_date: "2025-07-28T16:00:00",
    end_date: "2025-07-28T17:30:00",
    description: "Best practices for securing cloud infrastructure.",
    type: "webinar",
  },
  {
    title: "Tech Networking Night",
    start_date: "2025-07-30T19:00:00",
    end_date: "2025-07-30T21:00:00",
    description: "Meet fellow tech professionals and share ideas.",
    type: "networking",
  },
  {
    title: "Kubernetes Workshop",
    start_date: "2025-08-04T09:00:00",
    end_date: "2025-08-04T12:00:00",
    description: "Hands-on workshop on Kubernetes orchestration.",
    type: "training",
  },
  {
    title: "Startups Pitch Day",
    start_date: "2025-08-07T14:00:00",
    end_date: "2025-08-07T18:00:00",
    description: "Present your startup ideas to potential investors.",
    type: "pitch",
  },
  {
    title: "Quantum Computing Talk",
    start_date: "2025-08-11T17:00:00",
    end_date: "2025-08-11T18:30:00",
    description: "Introductory talk on quantum computing.",
    type: "talk",
  },
  {
    title: "Women in Tech Panel",
    start_date: "2025-08-14T18:00:00",
    end_date: "2025-08-14T20:00:00",
    description: "Panel discussion featuring leading women in tech.",
    type: "panel",
  },
];

export default function UnifiedWeekMonthCalendar({ events = mockEvents }) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedEvent, setSelectedEvent] = useState("he");

    const startOfWeek = selectedDate.startOf("week");
    const weekDays = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.add(i, "day")
    );

    function handleBackward() {
        setSelectedDate((prev) => prev.subtract(7, "day"));
    }

    function handleForward() {
        setSelectedDate((prev) => prev.add(7, "day"));
    }

    function handleSelectDay(date) {
        setSelectedDate(date);

        // Find event(s) on the selected date (you can pick first, or all)
        const eventsForDay = (events || []).filter((event) =>
            dayjs(date).isBetween(
                dayjs(event.start_date).startOf("day"),
                dayjs(event.end_date).endOf("day"),
                null,
                "[]"
            )
        );

        if (eventsForDay.length > 0) {
            // If multiple events, pick the first or handle as you want
            setSelectedEvent(eventsForDay[0]);
        } else {
            setSelectedEvent(null);
        }
    }

    return (
        <Box>
            {/* Week Row */}
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    boxShadow: "3",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        height: 60,
                    }}
                >
                    <Typography variant="subtitle1">
                        {selectedDate.format("dddd, MMM D")}{" "}
                    </Typography>
                    <Typography variant="subtitle1">
                        {selectedEvent?.title}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton onClick={() => handleBackward()}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    {weekDays.map((day) => {
                        // Get events that happen on this day (any overlap)
                        const eventsForDay = events.filter((event) => {
                            const eventStart = dayjs(event.start_date);
                            const eventEnd = dayjs(
                                event.end_date || event.start_date
                            );
                            return (
                                day.isSame(eventStart, "day") ||
                                (day.isAfter(eventStart, "day") &&
                                    day.isBefore(eventEnd, "day")) ||
                                day.isSame(eventEnd, "day")
                            );
                        });

                        return (
                            <Box
                                key={day.format("YYYY-MM-DD")}
                                sx={formatDay(day, selectedDate)}
                                onClick={() => handleSelectDay(day)}
                            >
                                <Typography variant="caption">
                                    {day.format("ddd")}
                                </Typography>
                                <Typography variant="body1">
                                    {day.format("D")}
                                </Typography>

                                {/* Event markers */}
                                <Box sx={{ mt: 0.5 }}>
                                    {eventsForDay.map((event, i) => {
                                        const color =
                                            eventColors[event.type] ||
                                            eventColors.default;
                                        const start = dayjs(
                                            event.start_date
                                        ).format("HH:mm");
                                        const end = dayjs(
                                            event.end_date
                                        ).format("HH:mm");

                                        return (
                                            <Box
                                                key={i}
                                                sx={{
                                                    bgcolor: color,
                                                    color: "white",
                                                    borderRadius: 1,
                                                    px: 0.5,
                                                    my: 0.2,
                                                    fontSize: "0.65rem",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    cursor: "default",
                                                }}
                                                title={`${event.title} (${start} - ${end})`}
                                            >
                                                <Typography variant='caption' sx={{fontSize:'0.7rem'}}>
                                                    {event.title}<br/> ({start}-{end}
                                                    )
                                                </Typography>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        );
                    })}
                    <IconButton onClick={() => handleForward()}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
}
