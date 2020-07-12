import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

export const getItems = () => (dispatch) => {
    // get items from database
    dispatch(setItemsLoading());
    axios.get("/api/items").then((items) =>
        dispatch({
            type: GET_ITEMS,
            payload: items.data,
        })
    );
};

export const addItem = (itemName) => (dispatch) => {
    axios
        .post("/api/items", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: itemName,
            }),
        })
        .then((item) => {
            dispatch({
                type: ADD_ITEM,
                payload: item.data,
            });
        });
};

export const deleteItem = (itemId) => (dispatch) => {
    axios
        .delete(`/api/items/${itemId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            dispatch({
                type: DELETE_ITEM,
                payload: itemId,
            });
        });
};

export const setItemsLoading = () => ({
    type: ITEMS_LOADING,
});
