import axios from "axios";
import { GET_LESSONS, ADD_LESSON, REMOVE_LESSON } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function getLessons(teacher_username, student_username, _token) {
    return async function (dispatch) {

        try {

            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`, { params: { _token } });
            console.log(data);

            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            console.log(e.response.data.message);
        }
    };
}

function getOneLesson(teacher_username, student_username, id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`, { params: { _token } });
            dispatch(gotLessons(data.lesson));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function createLesson(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}lessons/${teacher_username}/${student_username}/`, { _token });
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`, { params: { _token } });
            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            console.log(e);
        }
    };
}


function deleteLesson(teacher_username, student_username, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`, { _token });
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`, { params: { _token } });
            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            console.log(e);
        }
    };
}


function gotLessons(lessons) {
    return { type: GET_LESSONS, payload: lessons };
}

function editLesson(teacher_username, student_username, id, data, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`, { _token, ...data });
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`, { params: { _token } });
            dispatch(gotLessons(data.lessons));
        } catch (e) {
            console.log(e);
        }
    };
}

export { getLessons, getOneLesson, editLesson, deleteLesson, createLesson };