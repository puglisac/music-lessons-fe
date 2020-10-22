import { GET_NOTES, ADD_NOTE, REMOVE_NOTE, LOGOUT } from "../actions/actionTypes";

export default function notes(state = {}, action) {
    switch (action.type) {
        case GET_NOTES:
            const notes = { ...state, notes: action.payload };
            return notes;
        case LOGOUT:
            return { ...state, notes: null };
        default:
            return state;
    }
}