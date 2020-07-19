import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getItems = () => (dispatch) => {
    // get items from database
    dispatch(setItemsLoading());
    axios
        .get("/api/items")
        .then((items) =>
            dispatch({
                type: GET_ITEMS,
                payload: items.data,
            })
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = (itemName) => (dispatch) => {
    const body = JSON.stringify({
        name: itemName,
    });

    axios
        .post("/api/items", body, tokenConfig())
        .then((item) => {
            dispatch({
                type: ADD_ITEM,
                payload: item.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (itemId) => (dispatch) => {
    axios
        .delete(`/api/items/${itemId}`, tokenConfig())
        .then((res) => {
            dispatch({
                type: DELETE_ITEM,
                payload: itemId,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => ({
    type: ITEMS_LOADING,
});
