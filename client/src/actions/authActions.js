import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

// register user
export const registerUser = ({ name, email, password }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        name,
        email,
        password,
    });

    axios
        .post("/api/users", body, config)
        .then((res) =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // runs every time the app updates
    // user loading
    dispatch({ type: USER_LOADING });

    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then((res) =>
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

export const logout = () => ({
    type: LOGOUT_SUCCESS
})

export const tokenConfig = () => {
    // get token from localstorage
    const token = localStorage.getItem("token");

    // headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // add token to headers
    if (token) config.headers["x-auth-token"] = token;

    return config;
};
