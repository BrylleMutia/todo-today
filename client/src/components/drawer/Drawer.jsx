import React, { useState, useEffect } from "react";
import RegisterModal from "./registerModal/RegisterModal";
import LoginModal from "./loginModal/LoginModal";
import Logout from "./logout/Logout";

import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../../actions/itemActions";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import {
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Button,
    ListItem,
    ListItemText,
    ListItemIcon,
    Hidden,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    welcome: {
        marginRight: "auto",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    bottomDrawerBtn: {
        marginTop: "auto",
    },
}));

export default function PersistentDrawerLeft({ isRegisterModalOpen, registerModalToggle }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // display options for todos
    const showAllTodos = () => {
        dispatch(changeMode("all"));
        handleDrawerClose();
    };

    const showTodos = () => {
        dispatch(changeMode("todos"));
        handleDrawerClose();
    };

    const showCompletedTodos = () => {
        dispatch(changeMode("completed"));
        handleDrawerClose();
    };

    // links for authenticated user and guests
    const authLinks = (
        <React.Fragment>
            <span className={classes.welcome}>
                Welcome,
                <strong> {user ? user.name : null}!</strong>
            </span>
            <Logout />
        </React.Fragment>
    );

    const guestLinks = (
        <React.Fragment>
            <RegisterModal isRegisterModalOpen={isRegisterModalOpen} registerModalToggle={registerModalToggle} />
            <LoginModal />
        </React.Fragment>
    );

    return (
        <nav className={classes.root}>
            <CssBaseline />
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        style={{ display: isAuthenticated ? null : "none" }}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Hidden xsDown={isAuthenticated ? true : false}>
                        <Typography variant="h6" noWrap style={{ flex: "1" }}>
                            TODO TODAY!
                        </Typography>
                    </Hidden>
                    {isAuthenticated ? authLinks : guestLinks}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={1} onClick={showAllTodos}>
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="All" />
                    </ListItem>
                    <ListItem button key={2} onClick={showTodos}>
                        <ListItemIcon>
                            <TodayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItem>
                    <ListItem button key={3} onClick={showCompletedTodos}>
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Completed" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component="a" href="https://web.facebook.com/brylle03/" key={1}>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact Me" />
                    </ListItem>
                </List>
                <Button className={classes.bottomDrawerBtn} variant="contained" href="https://web.facebook.com/brylle03/">
                    Brylle Mutia &copy; 2020
                </Button>
            </Drawer>
        </nav>
    );
}
