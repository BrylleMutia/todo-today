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
            fontWeight: "450"
        }
    })
);

function ShoppingList() {
    // styles from material ui components
    const classes = useStyles();

    const dispatch = useDispatch();

    const { items, isLoading } = useSelector((state) => state.items);
    const userId = useSelector(state => state.auth.user._id);

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
                                        onClick={() => handleDeleteItem(item._id)}
                                    >
                                        &#10003;
                                    </Button>
                                    <span className={classes.span}>{item.name}</span>
                                    <span>{item.date.slice(5, 10)}</span>
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