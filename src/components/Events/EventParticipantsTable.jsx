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

export default function EventParticipantsTable({
    participants = [],
    onStatusChange,
}) {
    if (!participants.length) {
        return (
            <Typography variant="body2" sx={{ mt: 2 }}>
                No participants yet.
            </Typography>
        );
    }

    const handleToggleStatus = (p) => {
        const newStatus = p.status === "coming" ? "pending" : "coming";
        if (onStatusChange) onStatusChange(p.id, newStatus);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                        <TableCell>
                            <strong>Participant</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Contact</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Status Action</strong>
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
                                        <Typography variant="subtitle2">
                                            {member?.full_name || "—"}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack spacing={0.5}>
                                        <Typography variant="body2">
                                            {member?.email || "—"}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {member?.phone || "—"}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant={
                                            status === "coming"
                                                ? "contained"
                                                : "outlined"
                                        }
                                        color={
                                            status === "coming"
                                                ? "success"
                                                : "warning"
                                        }
                                        onClick={() => handleToggleStatus(p)}
                                        size="small"
                                    >
                                        {status === "coming"
                                            ? "Coming"
                                            : "Pending"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
