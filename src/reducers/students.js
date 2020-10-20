import { GET_STUDENTS, ADD_STUDENT, REMOVE_STUDENT } from "../actions/actionTypes";

export default function students(state = { students: null }, action) {
    switch (action.type) {
        case GET_STUDENTS:
            const students = { ...state, students: action.payload };
            return students;
        case ADD_STUDENT:
            const addedStudents = { ...state, [action.payload.username]: action.payload };
            return addedStudents;
        case REMOVE_STUDENT:
            const removedStudents = { ...state };
            delete removedStudents[action.payload];
            return removedStudents;
        default:
            return state;
    }
}