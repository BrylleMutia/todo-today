import React, { useState, useEffect } from "react";

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../../actions/authActions";
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

function RegisterModal({ isRegisterModalOpen, registerModalToggle, history }) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.error);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState(null);

    const onFormChange = (e) => {
        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
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

    const handleRegisterUser = (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
        };

        dispatch(registerUser(newUser));
        dispatch(clearErrors());
    };

    useEffect(() => {
        // display errors upon registration fail
        if (error.id === "REGISTER_FAIL") {
            setMsg(error.msg.msg);
        } else setMsg(null);

        // if authenticated, close modal
        if (isRegisterModalOpen && isAuthenticated) registerModalToggle();

        // redirect user to dashboard if Authenticated
        // if (!error.msg.msg && isAuthenticated) {
        //     return <Redirect to="/dashboard" />
        // }
    });

    return (
        <div className={classes.container}>
            <Button color="inherit" onClick={registerModalToggle}>
                Register
            </Button>

            <Dialog open={isRegisterModalOpen} onClose={registerModalToggle} aria-labelledby="form-dialog-title">
                <form onSubmit={handleRegisterUser}>
                    <DialogTitle id="form-dialog-title">REGISTER</DialogTitle>
                    {msg ? <Alert color="error" variant="standard">{msg}</Alert> : null}
                    <DialogContent>
                        <TextField onChange={onFormChange} autoFocus name="name" margin="dense" id="name" label="Name" type="text" fullWidth />
                        <TextField onChange={onFormChange} name="email" margin="dense" id="email" label="Email" type="email" fullWidth />
                        <TextField onChange={onFormChange} name="password" margin="dense" id="password" label="Password" type="password" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={registerModalToggle} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleRegisterUser} color="primary">
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default RegisterModal;
