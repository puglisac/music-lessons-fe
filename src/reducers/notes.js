import { GET_NOTES, ADD_NOTE, REMOVE_NOTE } from "../actions/actionTypes";

export default function notes(state = null, action) {
    switch (action.type) {
        case GET_NOTES:
            const notes = { ...state, notes: action.payload };
            return notes;
        case ADD_NOTE:
            const addedNotes = { ...state, [action.payload.id]: action.payload };
            return addedNotes;
        case REMOVE_NOTE:
            const removedNotes = { ...state };
            delete removedNotes[action.payload];
            return removedNotes;
        default:
            return state;
    }
}