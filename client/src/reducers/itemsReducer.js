import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING, CHANGE_MODE } from "../actions/types";

const initialState = {
    items: [],
    isLoading: false,
    mode: "all"
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items],
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: action.payload
            };
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CHANGE_MODE:
            return {
                ...state,
                mode: action.payload
            }
        default:
            return state;
    }
}
