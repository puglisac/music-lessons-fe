import { GET_TOKEN } from "../actions/actionTypes";

export default function token(state = null, action) {
    switch (action.type) {
        case GET_TOKEN:
            const userToken = { ...state, token: action.token };
            return userToken;

        default:
            return state;
    }
}