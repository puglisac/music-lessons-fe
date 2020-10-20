import axios from "axios";
import { GET_TOKEN, GET_USER, LOGOUT, GET_STUDENTS, ADD_STUDENT, REMOVE_STUDENT } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function loginTeacher(username, password) {
    return async function (dispatch) {

        try {
            const { data } = await axios.post(`${BASE_URL}teachers/login`, { username, password });
            dispatch(gotToken(data.token));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function signUpTeacher(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}teachers/signup`, { username, password, full_name, email });
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

function getTeacher(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}teachers/${username}`, { _token });
            dispatch(gotTeacher(data.teacher));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function editTeacher(username, data, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.patch(`${BASE_URL}teachers/${username}`, { _token, ...data });
            dispatch(gotTeacher(data.teacher));
        } catch (e) {
            console.log(e);
        }
    };
}

function gotTeacher(teacher) {
    return { type: GET_USER, payload: teacher };
}

function getStudents(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.patch(`${BASE_URL}teachers/${username}/students`, { _token });
            dispatch(gotStudents(data.students));
        } catch (e) {
            console.log(e);
        }
    };
}

function addStudent(teacher_username, student_username, _token) {
    return async function () {
        try {
            const { data } = await axios.patch(`${BASE_URL}teachers/${teacher_username}/add_student`, { student_username, _token });
            addedStudent(data.student);
        } catch (e) {
            console.log(e);
        }
    };
}

function addedStudent(student) {
    return { action: ADD_STUDENT, payload: student };
}

function removeStudent(teacher_username, student_username, _token) {
    return async function () {
        try {
            await axios.patch(`${BASE_URL}teachers/${teacher_username}/remove_student`, { student_username, _token });
            deleteStudent(student_username);
        } catch (e) {
            console.log(e);
        }
    };
}
function deleteStudent(username) {
    return { type: REMOVE_STUDENT, payload: username };
}
function gotStudents(students) {
    return { type: GET_STUDENTS, payload: students };
}

function deleteTeacher(username, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}teachers/${username}/`, { _token });
            dispatch(logout());
        } catch (e) {
            console.log(e);
        }
    };
}

function logout() {
    return { type: LOGOUT };
}


export { loginTeacher, signUpTeacher, getTeacher, logout, editTeacher, getStudents, deleteTeacher, addStudent, removeStudent };