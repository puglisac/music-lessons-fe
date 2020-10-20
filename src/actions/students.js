import axios from "axios";
import { GET_TOKEN, GET_USER, LOGOUT } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function loginStudent(username, password) {
    return async function (dispatch) {

        try {
            const token = await axios.post(`${BASE_URL}students/login`).send({ username, password });
            dispatch(gotToken(token));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function signUpStudent(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const token = await axios.post(`${BASE_URL}students/signup`).send({ username, password, full_name, email });
            dispatch(gotToken(token));
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
            const student = await axios.post(`${BASE_URL}students/${username}`).send({ _token });
            dispatch(gotStudent(student));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function editStudent(username, data) {
    return async function (dispatch) {
        try {
            const student = await axios.patch(`${BASE_URL}students/${username}`).send({ _token, ...data });
            dispatch(gotStudent(student));
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
            await axios.delete(`${BASE_URL}students/${username}/`).send({ _token });
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