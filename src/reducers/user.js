import { GET_USER } from "../actions/actionTypes";

export default function user(state = null, action) {
    switch (action.type) {
        case GET_USER:
            const currUser = { ...state, user: action.user };
            return currUser;

        default:
            return state;
    }
}