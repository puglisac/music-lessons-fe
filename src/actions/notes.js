import axios from "axios";
import { GET_NOTES, ADD_NOTE, REMOVE_NOTE } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function notes(teacher_username, student_username, lesson_id, _token) {
    return async function (dispatch) {

        try {
            const notes = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`).send({ _token });
            dispatch(gotNotes(notes));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function getOneNote(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            const note = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`).send({ _token });
            dispatch(gotNotes(note));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function createNote(teacher_username, student_username, lesson_id, note, _token) {
    return async function (dispatch) {
        try {
            const note = await axios.post(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`).send({ note, _token });
            dispatch(addNote(note));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function addNote(note) {
    return { action: ADD_NOTE, payload: note };
}

function deleteNote(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`).send({ _token });
            dispatch(deleteNote(id));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function deleteNote(id) {
    return { action: REMOVE_NOTE, payload: id };
}

function gotNotes(notes) {
    return { type: GET_NOTES, notes: notes };
}

function editNote(teacher_username, student_username, lesson_id, id, data, _token) {
    return async function (dispatch) {
        try {
            const note = await axios.patch(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`).send({ _token, ...data });
            dispatch(addNote(note));
        } catch (e) {
            console.log(e);
        }
    };
}

export { notes, getOneNote, createNote, deleteNote, editNote };