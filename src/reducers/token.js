import { GET_TOKEN, LOGOUT } from "../actions/actionTypes";

export default function token(state = {}, action) {
    switch (action.type) {
        case GET_TOKEN:
            const userToken = { ...state, token: action.payload };
            return userToken;
        case LOGOUT:
            return { ...state, token: null };
        default:
            return state;
    }
}