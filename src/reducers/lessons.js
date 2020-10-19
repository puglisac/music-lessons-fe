import { GET_LESSONS } from "../actions/actionTypes";

export default function lessons(state = null, action) {
    switch (action.type) {
        case GET_LESSONS:
            const lessons = { ...state, lessons: action.lessons };
            return lessons;

        default:
            return state;
    }
}