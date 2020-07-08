import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Drawer from "./components/drawer/Drawer";
import ShoppingList from "./components/shoppingList/ShoppingList";
import AddItemDialog from "./components/shoppingList/addItemDialog/AddItemDialog";
import "./App.scss";

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
