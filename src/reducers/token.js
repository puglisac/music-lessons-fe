import { GET_TOKEN, LOGOUT } from "../actions/actionTypes";

export default function token(state = null, action) {
    switch (action.type) {
        case GET_TOKEN:
            const userToken = { ...state, token: action.token };
            return userToken;
        case LOGOUT:
            return { ...state, token: null };
        default:
            return state;
    }
}