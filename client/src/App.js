import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";

import { Container, makeStyles } from "@material-ui/core";
import Drawer from "./components/drawer/Drawer";
import ShoppingList from "./components/shoppingList/ShoppingList";
import AddItemDialog from "./components/shoppingList/addItemDialog/AddItemDialog";

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
        padding: "2rem 1rem"
    },
});

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser()); // check for user auth everytime the app updates
    }, [])

    return (
        <React.Fragment>
            <Drawer />
            <main className={classes.app}>
                <Container className={classes.container} >
                    <ShoppingList />
                    <AddItemDialog />
                </Container>
            </main>
        </React.Fragment>
    );
}

export default App;
