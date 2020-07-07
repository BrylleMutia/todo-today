import React from "react";
import { Container } from "@material-ui/core";
import AppBar from "./components/appBar/AppBar";
import ShoppingList from "./components/shoppingList/ShoppingList";
import AddItemDialog from "./components/addItemDialog/AddItemDialog";

function App() {
    return (
        <div className="App">
            <AppBar />
            <Container>
                <AddItemDialog />
                <ShoppingList />
            </Container>
        </div>
    );
}

export default App;
