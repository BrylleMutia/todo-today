import React, { useState, useEffect } from "react";

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";

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

function LoginModal({ history }) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.error);

    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState(null);

    const onFormChange = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleLoginUser = (e) => {
        e.preventDefault();
        const userDetails = {
            email,
            password,
        };

        dispatch(loginUser(userDetails));
        // redirect user to dashboard if Authenticated
        // if (isAuthenticated || !error.msg.msg) history.push("/dashboard");
    };

    const dialogToggle = () => {
        setIsOpen(!isOpen);
        dispatch(clearErrors());
    };

    useEffect(() => {
        // display errors upon registration fail
        if (error.id === "LOGIN_FAIL") {
            setMsg(error.msg.msg);
        } else setMsg(null);

        // if authenticated, close modal
        if (isOpen && isAuthenticated) dialogToggle();
    });

    return (
        <div className={classes.container}>
            <Button color="inherit" onClick={dialogToggle}>
                Login
            </Button>

            <Dialog open={isOpen} onClose={dialogToggle} aria-labelledby="form-dialog-title">
                <form onSubmit={handleLoginUser}>
                    <DialogTitle id="form-dialog-title">LOGIN</DialogTitle>
                    {msg ? <Alert color="error" variant="standard">{msg}</Alert> : null}
                    <DialogContent>
                        <TextField onChange={onFormChange} name="email" margin="dense" id="email" label="Email" type="email" fullWidth autoFocus />
                        <TextField onChange={onFormChange} name="password" margin="dense" id="password" label="Password" type="password" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialogToggle} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleLoginUser} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default LoginModal;
