import React, { useState, useEffect } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, DialogContentText } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { logout } from "../../../actions/authActions";

const useStyles = makeStyles({
    addBtn: {
        marginTop: "1rem",
        minWidth: "50%",
    },
    container: {
        display: "flex",
        justifyContent: "center",
    },
});

function LogoutModal() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogoutUser = () => {
        dispatch(logout());
    };

    const logoutModalToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={classes.container}>
            <Button color="inherit" onClick={logoutModalToggle}>
                Logout
            </Button>

            <Dialog open={isOpen} onClose={logoutModalToggle} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">LOGOUT</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to logout?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={logoutModalToggle} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleLogoutUser} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}

export default LogoutModal;
