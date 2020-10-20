import axios from "axios";
import { GET_TOKEN, GET_USER, LOGOUT } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function loginStudent(username, password) {
    return async function (dispatch) {

        try {
            const { data } = await axios.post(`${BASE_URL}students/login`, { username, password });
            dispatch(gotToken(data.token));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}

function signUpStudent(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}students/signup`, { username, password, full_name, email });
            dispatch(gotToken(data.token));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function gotToken(token) {
    return { type: GET_TOKEN, payload: token };
}

function getStudent(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}students/${username}`, { _token });
            dispatch(gotStudent(data.student));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function editStudent(username, edits, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.patch(`${BASE_URL}students/${username}`, { _token, ...edits });
            dispatch(gotStudent(data.student));
        } catch (e) {
            console.log(e);
        }
    };
}

function gotStudent(student) {
    return { type: GET_USER, payload: student };
}
function deleteStudent(username, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}students/${username}/`, { _token });
            dispatch(logout());
        } catch (e) {
            console.log(e);
        }
    };
}

function logout() {
    return { type: LOGOUT };
}


export { loginStudent, signUpStudent, getStudent, logout, editStudent, deleteStudent };