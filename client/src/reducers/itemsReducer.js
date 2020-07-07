import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING } from "../actions/types";

const initialState = {
    items: [],
    isLoading: false,
};

export default function reducer(state = initialState, action) {
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
                items: [...state.items].filter((item) => item._id !== action.payload),
            };
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
}