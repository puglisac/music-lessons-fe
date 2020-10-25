import axios from "axios";
import { GET_LESSONS } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

// gets lessons from teacher username and student username and sets lesson state to response
function getLessons(teacher_username, student_username, _token) {
    return async function (dispatch) {

        try {

            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`,
                { params: { _token } });
            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            // set lesson state to empty array if no lessons
            if (e.response.data.status === 404) {
                dispatch(gotLessons([]));
            } else { console.log(e); }
        }
    };
}

// search for lessons by date and update lessons state
function searchLessons(teacher_username, student_username, search, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`,
                { params: { search, _token } });
            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            // set lessons state to empty array if no lessons
            if (e.response.data.status === 404) {
                dispatch(gotLessons([]));
            } else { console.log(e); }
        }
    };
}

// get one lesson and update lessons state
function getOneLesson(teacher_username, student_username, id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`,
                { params: { _token } });
            dispatch(gotLessons(data.lesson));
        }
        catch (e) {
            console.log(e);
        }
    };
}

// create a new lesson and update lessons state
function createLesson(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}lessons/${teacher_username}/${student_username}/`, { _token });
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`,
                { params: { _token } });
            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            console.log(e);
        }
    };
}

// delete a lesson and update lessons state
function deleteLesson(teacher_username, student_username, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`,
                { params: { _token } });
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`,
                { params: { _token } });
            dispatch(gotLessons(data.lessons));
        }
        catch (e) {
            // set sessons state to emtpy array if no lessons
            if (e.response.data.status === 404) {
                dispatch(gotLessons([]));
            } else { console.log(e); }
        }
    };
}

// edit a lesson and update state
function editLesson(teacher_username, student_username, id, edits, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}lessons/${teacher_username}/${student_username}/${id}`,
                { _token, ...edits });
            const { data } = await axios.get(`${BASE_URL}lessons/${teacher_username}/${student_username}`,
                { params: { _token } });
            dispatch(gotLessons(data.lessons));
        } catch (e) {
            console.log(e);
        }
    };
}

function gotLessons(lessons) {
    return { type: GET_LESSONS, payload: lessons };
}


export { getLessons, getOneLesson, editLesson, deleteLesson, createLesson, searchLessons };