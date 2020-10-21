import axios from "axios";
import { GET_HOMEWORK, ADD_HOMEWORK, REMOVE_HOMEWORK } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function homework(teacher_username, student_username, lesson_id, _token) {
    return async function (dispatch) {

        try {
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { params: { _token } });
            dispatch(gotHomework(data.homework));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function getOneHomework(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`, { params: { _token } });
            dispatch(gotHomework(data.homework));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function createHomework(teacher_username, student_username, lesson_id, note, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}`, { note, _token });
            dispatch(addHomework(data.homework));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function addHomework(homework) {
    return { action: ADD_HOMEWORK, payload: homework };
}

function deleteHomework(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`, { _token });
            dispatch(removeHomework(id));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function removeHomework(id) {
    return { action: REMOVE_HOMEWORK, payload: id };
}

function gotHomework(homework) {
    return { type: GET_HOMEWORK, homework: homework };
}

function editHomework(teacher_username, student_username, lesson_id, id, data, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.patch(`${BASE_URL}notes/${teacher_username}/${student_username}/${lesson_id}/${id}`, { _token, ...data });
            dispatch(addHomework(data.homework));
        } catch (e) {
            console.log(e);
        }
    };
}

export { homework, getOneHomework, createHomework, editHomework, deleteHomework };