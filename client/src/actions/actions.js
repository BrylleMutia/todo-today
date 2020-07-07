import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => (dispatch) => {
    // get items from database
    dispatch(setItemsLoading());
    fetch("/api/items")
        .then((res) => res.json())
        .then((items) =>
            dispatch({
                type: GET_ITEMS,
                payload: items,
            })
        );
};

export const addItem = (itemName) => (dispatch) => {
    fetch("/api/items", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: itemName,
        }),
    })
        .then((res) => res.json())
        .then((item) => {
            dispatch({
                type: ADD_ITEM,
                payload: item,
            });
        });
};

export const deleteItem = (itemId) => (dispatch) => {
    fetch(`/api/items/${itemId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            dispatch({
                type: DELETE_ITEM,
                payload: itemId,
            });
        });
};

export const setItemsLoading = () => ({
    type: ITEMS_LOADING,
});
