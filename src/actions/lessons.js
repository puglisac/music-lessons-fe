import axios from "axios";
import { GET_LESSONS, ADD_LESSON, REMOVE_LESSON } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function lessons(teacher_username, student_username, _token) {
    return async function (dispatch) {

        try {
            const lessons = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`).send({ _token });
            dispatch(gotLessons(lessons));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function getOneLessons(teacher_username, student_username, id, _token) {
    return async function (dispatch) {
        try {
            const lesson = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`).send({ _token });
            dispatch(gotLessons(lesson));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function createLesson(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            const lesson = await axios.post(`${BASE_URL}lessons/${teacher_username}/${student_username}/`).send({ _token });
            dispatch(addLesson(lesson));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function addLesson(lesson) {
    return { action: ADD_LESSON, payload: lesson };
}

function deleteLesson(teacher_username, student_username, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`).send({ _token });
            dispatch(removeLesson(id));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function removeLesson(id) {
    return { action: REMOVE_LESSON, payload: id };
}

function gotLessons(lessons) {
    return { type: GET_LESSONS, lessons: lessons };
}

function editLesson(teacher_username, student_username, id, data, _token) {
    return async function (dispatch) {
        try {
            const lesson = await axios.patch(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`).send({ _token, ...data });
            dispatch(addLesson(lesson));
        } catch (e) {
            console.log(e);
        }
    };
}

export { lessons, getOneLessons, editLesson, deleteLesson, createLesson };