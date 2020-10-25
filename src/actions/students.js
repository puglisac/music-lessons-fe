import axios from "axios";
import { GET_TOKEN, GET_USER, LOGOUT } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

// login a student and update token state and get student by username
function loginStudent(username, password) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}students/login`, { username, password });
            dispatch(gotToken(data.token));
            dispatch(getStudent(username, data.token));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}

// signup a student and update token state and get student by username
function signUpStudent(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}students/signup`, { username, password, full_name, email });
            dispatch(gotToken(data.token));
            dispatch(getStudent(username, data.token));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}

function gotToken(token) {
    return { type: GET_TOKEN, payload: token };
}

// get a student by username and update user state
function getStudent(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}students/${username}`, { params: { _token } });
            dispatch(gotStudent(data.student));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}

// edit student info and get student by username
function editStudent(username, edits, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.patch(`${BASE_URL}students/${username}`, { _token, ...edits });
            dispatch(gotStudent(data.student));
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}

// delete a student and logout user
function deleteStudent(username, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}students/${username}/`, { params: { _token } });
            dispatch(logout());
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}

function gotStudent(student) {
    return { type: GET_USER, payload: student };
}

// logout user
function logout() {
    return { type: LOGOUT };
}


export { loginStudent, signUpStudent, getStudent, logout, editStudent, deleteStudent };