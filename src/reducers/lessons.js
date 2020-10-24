import { GET_LESSONS, LOGOUT } from "../actions/actionTypes";

export default function lessons(state = {}, action) {
    switch (action.type) {
        case GET_LESSONS:
            const lessons = { ...state, lessons: action.payload };
            return lessons;
        case LOGOUT:
            return { ...state, lessons: null };
        default:
            return state;
    }
}