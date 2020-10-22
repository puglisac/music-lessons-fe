import { GET_HOMEWORK, ADD_HOMEWORK, REMOVE_HOMEWORK, LOGOUT } from "../actions/actionTypes";

export default function homework(state = {}, action) {
    switch (action.type) {
        case GET_HOMEWORK:
            const homework = { ...state, homework: action.payload };
            return homework;
        case LOGOUT:
            return { ...state, homework: null };
        default:
            return state;
    }
}