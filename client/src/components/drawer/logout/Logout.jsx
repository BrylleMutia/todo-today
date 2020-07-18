import React from "react";
import { logout } from "../../../actions/authActions";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(logout());

    return (
        <Button color="inherit" onClick={handleLogout}>
            Logout
        </Button>
    );
}

export default Logout;
