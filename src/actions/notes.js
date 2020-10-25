import axios from "axios";
import { GET_NOTES } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

// get notes for lesson by id, teacher username, and student username and set notes state to response
function getNotes(teacher_username, student_username, lesson_id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotNotes(data.notes));
        }
        catch (e) {
            // set notes state to empty array if no notes
            if (e.response.data.status === 404) {
                dispatch(gotNotes([]));
            } else { console.log(e); }
        }
    };
}

// get one note and update notes state
function getOneNote(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`,
                { params: { _token } });
            dispatch(gotNotes(data.note));
        }
        catch (e) {
            console.log(e);
        }
    };
}

// create a new note and update notes state
function createNote(teacher_username, student_username, lesson_id, note, _token) {
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { note, _token });
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotNotes(data.notes));
        }
        catch (e) {
            console.log(e);
        }
    };
}

// delete a note and update notes state
function deleteNote(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`,
                { params: { _token } });
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotNotes(data.notes));
        }
        catch (e) {
            // set notes state to empty array if no notes
            if (e.response.data.status === 404) {
                dispatch(gotNotes([]));
            } else { console.log(e); }
        }

    };
}

// edit a note and update state
function editNote(teacher_username, student_username, lesson_id, id, edits, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`,
                { _token, ...edits });
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotNotes(data.notes));
        } catch (e) {
            console.log(e);
        }
    };
}

function gotNotes(notes) {
    return { type: GET_NOTES, payload: notes };
}

export { getNotes, getOneNote, createNote, deleteNote, editNote };