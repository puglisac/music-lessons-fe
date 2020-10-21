import { GET_USER, LOGOUT } from "../actions/actionTypes";

export default function user(state = {}, action) {
    switch (action.type) {
        case GET_USER:
            const currUser = { ...state, user: action.payload };
            return currUser;
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}