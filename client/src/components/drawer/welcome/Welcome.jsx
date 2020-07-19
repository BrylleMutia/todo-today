import React from "react";
import WelcomeImg from "../../img/undraw_online_calendar_kvu2.png";
import "./Welcome.css";

import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    header: {
        marginBottom: "2rem",
    },
    register_msg: {
        marginBottom: "1rem"
    }
}));

function Welcome({ registerModalToggle }) {
    const classes = useStyles();

    return (
        <div className="welcome">
            <img src={WelcomeImg} alt="welcome" />
            <div className="welcome-container">
                <Typography className={classes.header} variant="h3" align="center">
                    What's your Todo Today?
                </Typography>
                <Typography className={classes.register_msg}variant="subtitle1">Not a user yet? Register to get started.</Typography>
                <Button variant="contained" color="primary" onClick={registerModalToggle}>
                    Get started
                </Button>
            </div>
        </div>
    );
}

export default Welcome;
