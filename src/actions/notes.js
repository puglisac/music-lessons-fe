import axios from "axios";
import { GET_NOTES, ADD_NOTE, REMOVE_NOTE } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function getNotes(teacher_username, student_username, lesson_id, _token) {
    return async function (dispatch) {

        try {
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { params: { _token } });
            dispatch(gotNotes(data.notes));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function getOneNote(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`, { params: { _token } });
            dispatch(gotNotes(data.note));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function createNote(teacher_username, student_username, lesson_id, note, _token) {
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { note, _token });
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { params: { _token } });
            dispatch(gotNotes(data.notes));
        }
        catch (e) {
            console.log(e);
        }
    };
}


function deleteNote(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`, { _token });
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { params: { _token } });
            dispatch(gotNotes(data.notes));
        }
        catch (e) {
            console.log(e);
        }
    };
}


function gotNotes(notes) {
    return { type: GET_NOTES, payload: notes };
}

function editNote(teacher_username, student_username, lesson_id, id, data, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`, { _token, ...data });
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { params: { _token } });
            dispatch(gotNotes(data.notes));
        } catch (e) {
            console.log(e);
        }
    };
}

export { getNotes, getOneNote, createNote, deleteNote, editNote };