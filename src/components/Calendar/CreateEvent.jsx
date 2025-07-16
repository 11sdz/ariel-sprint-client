import {
    Box,
    Card,
    IconButton,
    MenuItem,
    Modal,
    Paper,
    TextField,
    Tooltip,
    Typography,
    FormControl,
    InputLabel,
    Select,
    Button,
    CardMedia,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { eventTypes } from "./events";
import { toTitleCase } from "../../utils/textUtils";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/calendar-booking.json";
import { useApi } from "../../hooks/useApi";


import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CreateEvent() {
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [description, setDescription] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs());
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs());
    const [coverImage, setCoverImage] = useState("");
    const [newEvent, setNewEvent] = useState(null);

    function handleSetCoverImage(){
        setCoverImage('')
    }

    function handleCloseDatePicker() {
        setOpenDatePicker(false);
    }

    function handleOpenDatePicker() {
        setOpenDatePicker(true);
    }

    const {
        mutate: createEvent,
        data: responseData,
        error: postError,
        isLoading: isPosting,
    } = useApi("/api/events", {
        method: "POST",
    });

    async function handleSubmit() {
        setOpenDatePicker(false);

        const eventData = {
            event_name: eventName,
            type: eventType,
            descriptions: description,
            start_date: selectedStartDate.toISOString(),
            end_date: selectedEndDate.toISOString(),
            location: eventLocation,
        };

        setNewEvent(eventData); // optional, for UI preview or debug

        createEvent(eventData); // dynamic mutation

        // ✅ Reset form fields after submission
        setEventName("");
        setEventType("");
        setDescription("");
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setEventLocation("");
    }

    return (
        <Box>
            <Paper
                sx={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    p: 1,
                    height: 192,
                    width: 165,
                    borderRadius: "8px",
                    boxShadow: 3,
                    marginLeft: 1,
                }}
            >
                <Tooltip title={"New Event"}>
                    <IconButton
                        sx={{ scale: 4 }}
                        onClick={handleOpenDatePicker}
                    >
                        <EditCalendarIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            <Modal
                open={openDatePicker}
                onClose={handleCloseDatePicker}
                closeAfterTransition
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        outline: "none",
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        width: 380,
                    }}
                >
                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "center",
                        }}
                    >
                        <Paper>
                            <Lottie animationData={animationData} />
                        </Paper>
                        <ToggleButtonGroup
                            value={coverImage}
                            exclusive
                            onChange={handleSetCoverImage}
                            aria-label="text alignment"
                            sx={{justifyContent:'center'}}
                        >
                            <ToggleButton
                                value="left"
                                aria-label="left aligned"
                            >
                                <LooksOneIcon />
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                <LooksTwoIcon />
                            </ToggleButton>
                            <ToggleButton
                                value="right"
                                aria-label="right aligned"
                            >
                                <Looks3Icon />
                            </ToggleButton>
                            <ToggleButton
                                value="justify"
                                aria-label="justified"
                            >
                                <Looks4Icon />
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <TextField
                            variant="outlined"
                            label="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            label="Where"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="event-type-label">Type</InputLabel>
                            <Select
                                labelId="event-type-label"
                                value={eventType}
                                label="Type"
                                onChange={(e) => setEventType(e.target.value)}
                            >
                                {eventTypes.map((eventTypeItem) => (
                                    <MenuItem
                                        key={eventTypeItem}
                                        value={eventTypeItem}
                                    >
                                        {toTitleCase(eventTypeItem)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            label="Describe the event"
                            multiline
                            maxRows={4}
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* DatePicker */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1,
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="When"
                                    value={selectedStartDate}
                                    minDate={dayjs()} // ✅ Must be a dayjs object
                                    onChange={(newValue) => {
                                        setSelectedStartDate(newValue);
                                        // Optionally update end date if it becomes invalid
                                        if (
                                            newValue &&
                                            selectedEndDate.isBefore(newValue)
                                        ) {
                                            setSelectedEndDate(newValue);
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ mr: 2 }} />
                                    )}
                                />

                                <DatePicker
                                    label="Until"
                                    value={selectedEndDate}
                                    minDate={selectedStartDate} // ✅ This is also a dayjs object
                                    onChange={(newValue) =>
                                        setSelectedEndDate(newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Button
                            variant="contained"
                            disabled={
                                !eventName ||
                                !eventType ||
                                !selectedStartDate ||
                                !selectedEndDate ||
                                !eventLocation
                            }
                            onClick={handleSubmit}
                        >
                            Create Event
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
