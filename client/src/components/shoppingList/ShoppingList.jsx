import React, { useEffect } from "react";
import { deleteItem } from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, List, ListItem, CircularProgress } from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { makeStyles, createStyles } from "@material-ui/styles";
import { getItems } from "../../actions/actions";
import "./ShoppingList.scss";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        removeBtn: {
            marginRight: "1rem",
        },
        addBtn: {
            marginTop: "1rem",
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
    }, []);

    const handleDeleteItem = (id) => {
        dispatch(deleteItem(id));
    };

    return (
        <Container>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <List>
                    <TransitionGroup>
                        {items.map((item) => (
                            <CSSTransition key={item._id} timeout={500} classNames="fade">
                                <ListItem >
                                    <Button
                                        className={classes.removeBtn}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleDeleteItem(item._id)}
                                    >
                                        &times;
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
