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
import { mockEvents } from "./events";
import {
    getColorForType,
    getEventsForDate,
} from "../../utils/Dashboard/eventsUtils";

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
 *  cover_img
 * }
 *
 *
 */

export default function UnifiedWeekMonthCalendar({
    events = mockEvents,
    setDay,
}) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedEvent, setSelectedEvent] = useState();

    const startOfWeek = selectedDate.startOf("week");
    const weekDays = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.add(i, "day")
    );

    function handleBackward() {
        setSelectedDate((prev) => prev.subtract(7, "day"));
        setSelectedEvent(getEventsForDate(selectedDate, events)[0]);
    }

    function handleForward() {
        setSelectedDate((prev) => prev.add(7, "day"));
        setSelectedEvent(getEventsForDate(selectedDate, events)[0]);
    }

    function handleSelectDay(date) {
        setSelectedDate(date);
        setDay(date);

        // Find event(s) on the selected date (you can pick first, or all)
        const eventsForDay = getEventsForDate(date, events);

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
                    <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Poppins", fontSize: "1.1rem" }}
                    >
                        {selectedDate.format("dddd, MMM D")}{" "}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                        }}
                    >
                        {selectedEvent?.event_name}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton onClick={() => handleBackward()}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    {weekDays.map((day) => {
                        // Get events that happen on this day (any overlap)
                        const eventsForDay = (events || []).filter((event) => {
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
                                        const color = getColorForType(
                                            event.type
                                        );
                                        const eventStart = dayjs(
                                            event.start_date
                                        );
                                        const eventEnd = dayjs(
                                            event.end_date || event.start_date
                                        );

                                        const isStartDay = day.isSame(
                                            eventStart,
                                            "day"
                                        );
                                        const isEndDay = day.isSame(
                                            eventEnd,
                                            "day"
                                        );

                                        const start =
                                            eventStart.format("HH:mm");
                                        const end = eventEnd.format("HH:mm");

                                        const timeLabel =
                                            isStartDay && isEndDay
                                                ? `${start} - ${end}`
                                                : isStartDay
                                                ? `${start} →`
                                                : isEndDay
                                                ? `← ${end}`
                                                : "All day";

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
                                                title={`${event.event_name} (${start} - ${end})`}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontSize: "0.7rem" }}
                                                >
                                                    {event.event_name}
                                                    <br /> ({timeLabel})
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
