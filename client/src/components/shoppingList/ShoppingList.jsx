import React, { useEffect } from "react";

import { Container, Button, List, ListItem, CircularProgress } from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { makeStyles, createStyles } from "@material-ui/styles";

import { getItems, deleteItem } from "../../actions/itemActions";
import { useSelector, useDispatch } from "react-redux";

import "./ShoppingList.css";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        removeBtn: {
            marginRight: "1rem",
            padding: "0",
        },
        container: {
            display: "flex",
            justifyContent: "center",
        },
        span: {
            display: "flex",
            flexDirection: "row",
            flex: "1",
            marginRight: "5rem",
            fontWeight: "450",
        },
        todo_done: {
            textDecoration: "line-through",
            color: "grey",
        },
    })
);

function ShoppingList() {
    // styles from material ui components
    const classes = useStyles();

    const dispatch = useDispatch();

    let { items, isLoading } = useSelector((state) => state.items);
    const userId = useSelector((state) => state.auth.user._id);
    const mode = useSelector((state) => state.items.mode);

    // display todos depending on current mode
    switch (mode) {
        case "todos":
            items = items.filter((item) => item.completed !== true);
            break;
        case "completed":
            items = items.filter((item) => item.completed === true);
            break;
        default:
            break;
    }

    // get items from database
    useEffect(() => {
        dispatch(getItems(userId));
    }, [dispatch, userId]);

    const handleDeleteItem = (itemId) => {
        dispatch(deleteItem(userId, itemId));
    };

    return (
        <Container className={classes.container}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <List>
                    <TransitionGroup>
                        {items.map((item) => (
                            <CSSTransition key={item._id} timeout={500} classNames="fade">
                                <ListItem>
                                    <Button
                                        className={classes.removeBtn}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        disabled={item.completed ? true : false}
                                        onClick={() => handleDeleteItem(item._id)}
                                    >
                                        &#10003;
                                    </Button>
                                    <span className={item.completed ? classes.todo_done : null}>{item.name}</span>
                                </ListItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </List>
            )}
        </Container>
    );
}

export default ShoppingList;
