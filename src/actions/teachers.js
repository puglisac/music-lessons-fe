import axios from "axios";
import { GET_TOKEN, GET_USER } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function loginTeacher(username, password) {
    return async function (dispatch) {

        try {
            const token = await axios.post(`${BASE_URL}teachers/login`).send({ username, password });
            dispatch(gotToken(token));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function signUpTeacher(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const token = await axios.post(`${BASE_URL}teachers/signup`).send({ username, password, full_name, email });
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

function getTeacher(username) {
    return async function (dispatch) {
        try {
            const teacher = await axios.post(`${BASE_URL}teachers/${username}`).send({ username, password, full_name, email });
            dispatch(gotTeacher(teacher));
        }
        catch (e) {
            console.log(e);
        }
    };
}
function gotTeacher(techer) {
    return { type: GET_USER, payload: teacher };
}


export { loginTeacher, signUpTeacher, getTeacher };