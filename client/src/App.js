import React, { useEffect, useState } from "react";
import Drawer from "./components/drawer/Drawer";
import ShoppingList from "./components/shoppingList/ShoppingList";
import AddItemDialog from "./components/shoppingList/addItemDialog/AddItemDialog";
import Welcome from "./components/drawer/welcome/Welcome";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/authActions";
import { clearErrors } from "./actions/errorActions";

import { Container, makeStyles } from "@material-ui/core";

import "./App.css";

const useStyles = makeStyles({
    app: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "fit-content",
        marginTop: "0.5rem",
        padding: "2rem 1rem",
    },
});

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleRegisterModalToggle = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
        dispatch(clearErrors());
    };

    useEffect(() => {
        dispatch(loadUser()); // check for user auth everytime the app updates
    }, []);

    return (
        <React.Fragment>
            <Drawer isRegisterModalOpen={isRegisterModalOpen} registerModalToggle={handleRegisterModalToggle} />
            <Container className={classes.container}>
                {isAuthenticated ? (
                    <main className={classes.app}>
                        <AddItemDialog />
                        <ShoppingList />
                    </main>
                ) : (
                    <Welcome registerModalToggle={handleRegisterModalToggle} />
                )}
            </Container>
        </React.Fragment>
    );
}

export default App;
