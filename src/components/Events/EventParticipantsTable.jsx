import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Paper,
    Typography,
    Stack,
    Tooltip,
    Button,
} from "@mui/material";
import ChangeStatus from "../Button/ChangeStatus";

export default function EventParticipantsTable({
    participants = [],
    eventId
}) {
    if (!participants.length) {
        return (
            <Typography variant="body2" sx={{ mt: 2 }}>
                No participants yet.
            </Typography>
        );
    }

    return (
        <TableContainer
            component={Paper}
            sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                        <TableCell>
                            <Typography variant="h6">Participant</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography variant="h6">Contact</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography variant="h6">Status Action</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {participants.map((p) => {
                        const status = p.status?.toLowerCase();
                        const { member } = p;
                        return (
                            <TableRow key={p.id} hover>
                                <TableCell>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        <Tooltip
                                            title={member?.full_name || ""}
                                        >
                                            <Avatar
                                                alt={member?.full_name}
                                                src={member?.profile_img}
                                            />
                                        </Tooltip>
                                        <Typography variant="h6">
                                            {member?.full_name || "—"}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack spacing={0.5}>
                                        <Typography variant="subtitle1">
                                            {member?.email || "—"}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                        >
                                            {member?.phone || "—"}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <ChangeStatus eventId={eventId} id={p.id} status={p.status} email={p.member.email} phone={p.member.phone}/>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
