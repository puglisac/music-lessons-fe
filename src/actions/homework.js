import axios from "axios";
import { GET_HOMEWORK } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

// gets homework by lesson id, teacher username, student username and sets homework state to response
function getHomework(teacher_username, student_username, lesson_id, _token) {
    return async function (dispatch) {

        try {
            const { data } = await axios.get(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotHomework(data.homework));
        }
        catch (e) {
            // set homework state to empty array if no homework
            if (e.response.data.status === 404) {
                dispatch(gotHomework([]));
            } else { console.log(e); }
        }
    };
}

// get one homework and update homework state
function getOneHomework(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}/${id}`,
                { params: { _token } });
            dispatch(gotHomework(data.homework));
        }
        catch (e) {
            console.log(e);
        }
    };
}


// creates a new homework and updates homework state
function createHomework(teacher_username, student_username, lesson_id, assignment, _token) {
    return async function (dispatch) {
        try {
            console.log(assignment);
            await axios.post(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}`,
                { assignment, _token });
            const { data } = await axios.get(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotHomework(data.homework));
        }
        catch (e) {
            console.log(e);
        }
    };
}

// deletes homework and updates homework state
function deleteHomework(teacher_username, student_username, lesson_id, id, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}/${id}`,
                { params: { _token } });
            const { data } = await axios.get(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotHomework(data.homework));
        }
        catch (e) {
            // sets homework state to empty array if no homework for lesson
            if (e.response.data.status === 404) {
                dispatch(gotHomework([]));
            } else { console.log(e); }
        }
    };
}

// edits homework and updates homework state
function editHomework(teacher_username, student_username, lesson_id, id, edits, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}/${id}`,
                { _token, ...edits });
            const { data } = await axios.get(`${BASE_URL}homework/${teacher_username}/${student_username}/${lesson_id}`,
                { params: { _token } });
            dispatch(gotHomework(data.homework));
        } catch (e) {
            console.log(e);
        }
    };
}

function gotHomework(homework) {
    return { type: GET_HOMEWORK, payload: homework };
}

export { getHomework, getOneHomework, createHomework, editHomework, deleteHomework };