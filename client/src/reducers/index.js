import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import authReducer from "../reducers/authReducer";
import errorReducer from "../reducers/errorReducer";

export default combineReducers({
    items: itemsReducer,
    auth: authReducer,
    error: errorReducer,
});
