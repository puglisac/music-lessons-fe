import { GET_LESSONS, ADD_LESSON, REMOVE_LESSON } from "../actions/actionTypes";

export default function lessons(state = null, action) {
    switch (action.type) {
        case GET_LESSONS:
            const lessons = { ...state, lessons: action.payload };
            return lessons;
        case ADD_LESSON:
            const addedLessons = { ...state, [action.payload.id]: action.payload };
            return addedLessons;
        case REMOVE_LESSON:
            const removedLessons = { ...state };
            delete removedLessons[action.payload];
            return removedLessons;
        default:
            return state;
    }
}