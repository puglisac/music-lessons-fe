import { GET_USER, LOGOUT } from "../actions/actionTypes";

export default function user(state = null, action) {
    switch (action.type) {
        case GET_USER:
            const currUser = { ...state, user: action.user };
            return currUser;
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}