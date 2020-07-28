import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, CHANGE_MODE } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getItems = (userId) => (dispatch) => {
    // get items from database
    dispatch(setItemsLoading());

    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(`/api/items/${userId}`, headers)
        .then((items) =>
            dispatch({
                type: GET_ITEMS,
                payload: items.data
            })
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = (itemName, userId) => (dispatch) => {
    const body = JSON.stringify({
        name: itemName,
    });

    axios
        .post(`/api/items/${userId}`, body, tokenConfig())
        .then((item) => {
            dispatch({
                type: ADD_ITEM,
                payload: item.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (userId, itemId) => (dispatch) => {
    axios
        .delete(`/api/items/${userId}/${itemId}`, tokenConfig())
        .then((items) => {
            dispatch({
                type: DELETE_ITEM,
                payload: items.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => ({
    type: ITEMS_LOADING,
});
 
export const changeMode = (mode = "all") => ({
    type: CHANGE_MODE,
    payload: mode
})
