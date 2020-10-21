import { GET_HOMEWORK, ADD_HOMEWORK, REMOVE_HOMEWORK } from "../actions/actionTypes";

export default function homework(state = {}, action) {
    switch (action.type) {
        case GET_HOMEWORK:
            const homework = { ...state, homework: action.payload };
            return homework;
        case ADD_HOMEWORK:
            const addedHomework = { ...state, [action.payload.id]: action.payload };
            return addedHomework;
        case REMOVE_HOMEWORK:
            const removedHomework = { ...state };
            delete removedHomework[action.payload];
            return removedHomework;
        default:
            return state;
    }
}