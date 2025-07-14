
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
    Tooltip,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LinkIcon from "@mui/icons-material/Link";
import ExploreIcon from "@mui/icons-material/Explore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const navbarItems = [
    { label: "Dashboard", mobile: false, href: "/", icon: <DashboardIcon /> },
    { label: "Members", mobile: false, href: "/members", icon: <PeopleIcon /> },
    {
        label: "Profile",
        mobile: true,
        href: "/profile",
        icon: <AccountBoxIcon />,
    },
    {
        label: "Connections",
        mobile: true,
        href: "/connections",
        icon: <LinkIcon />,
    },
    {
        label: "Discover",
        mobile: true,
        href: "/discover",
        icon: <ExploreIcon />,
    },
    {
        label: "AI Matching",
        mobile: false,
        href: "/aiMatching",
        icon: <AutoAwesomeIcon />,
    },
];

export default function Navbar() {
    const [expanded, setExpanded] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const sidebarWidth = expanded ? 200 : 64;

    // Mobile tab bar
    if (isMobile) {
        return (
            <Paper
                elevation={3}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1300, // stay above most components
                    borderTop: "1px solid #ccc",
                }}
            >
                <BottomNavigation showLabels value={location.pathname}>
                    {navbarItems.map((item) => {
                        return item.mobile && <BottomNavigationAction
                            key={item.href}
                            label={item.label}
                            icon={item.icon}
                            value={item.href}
                            component={NavLink}
                            to={item.href}
                        />;
                    })}
                </BottomNavigation>
            </Paper>
        );
    }

    // Desktop sidebar
    return (
        <Box
            component="nav"
            sx={{
                height: "100vh",
                width: sidebarWidth,
                bgcolor: "#fff",
                p: 2,
                boxShadow: 4,
                display: "flex",
                flexDirection: "column",
                transition: "width 0.3s",
                position: "relative",
                zIndex: 1200,
            }}
        >
            <IconButton onClick={() => setExpanded(!expanded)} sx={{ mb: 2 }}>
                <MenuIcon />
            </IconButton>
            {navbarItems.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.href}
                    end={item.href === "/"}
                    style={({ isActive }) => ({
                        textDecoration: "none",
                    })}
                >
                    {({ isActive }) => (
                        <Tooltip
                            title={!expanded ? item.label : ""}
                            placement="right"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    px: 0,
                                    py: 1,
                                    mb: 1,
                                    borderRadius: "25px",
                                    fontWeight: isActive ? "bold" : "normal",
                                    backgroundImage: isActive
                                        ? "linear-gradient(to right, #003366, #3399FF)"
                                        : "transparent",
                                    color: isActive ? "white" : "black",
                                    cursor: "pointer",
                                    boxShadow: isActive ? 3 : "none",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 4,
                                        color: "black",
                                    },
                                }}
                            >
                                {React.cloneElement(item.icon, {
                                    sx: { marginLeft: expanded ? 1 : 0.5 },
                                })}
                                {expanded && (
                                    <Typography
                                        sx={{
                                            color: isActive ? "white" : "black",
                                        }}
                                        variant="body1"
                                    >
                                        {item.label}
                                    </Typography>
                                )}
                            </Box>
                        </Tooltip>
                    )}
                </NavLink>
            ))}
        </Box>
    );
}
