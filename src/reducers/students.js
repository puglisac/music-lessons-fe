import { GET_STUDENTS, LOGOUT } from "../actions/actionTypes";

export default function students(state = {}, action) {
    switch (action.type) {
        case GET_STUDENTS:
            const students = { ...state, students: action.payload };
            return students;
        case LOGOUT:
            return { ...state, students: null };
        default:
            return state;
    }
}