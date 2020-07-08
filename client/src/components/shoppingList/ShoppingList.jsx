import React, { useEffect } from "react";
import { deleteItem } from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, List, ListItem, CircularProgress } from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { makeStyles, createStyles } from "@material-ui/styles";
import { getItems } from "../../actions/actions";
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
    })
);

function ShoppingList() {
    // styles from material ui components
    const classes = useStyles();

    const dispatch = useDispatch();

    const { items, isLoading } = useSelector((state) => state.items);

    // get items from database
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    const handleDeleteItem = (id) => {
        dispatch(deleteItem(id));
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
                                    {item.name}
                                </ListItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </List>
            )}
        </Container>
    );
}

ShoppingList.propTypes = {};

export default ShoppingList;
