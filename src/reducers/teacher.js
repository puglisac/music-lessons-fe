import { GET_TEACHER, LOGOUT } from "../actions/actionTypes";

export default function teacher(state = {}, action) {
    switch (action.type) {
        case GET_TEACHER:
            const teacher = { ...state, teacher: action.payload };
            return teacher;
        case LOGOUT:
            return { ...state, teacher: null };
        default:
            return state;
    }
}