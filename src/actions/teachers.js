import axios from "axios";
import { GET_TOKEN, GET_USER, LOGOUT, GET_STUDENTS, GET_TEACHER } from "./actionTypes";

const BASE_URL = "http://localhost:5000/";

function loginTeacher(username, password) {
    return async function (dispatch) {

        try {
            const { data } = await axios.post(`${BASE_URL}teachers/login`, { username, password });
            dispatch(gotToken(data.token));
            dispatch(getTeacher(username, data.token));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}

function signUpTeacher(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}teachers/signup`, { username, password, full_name, email });
            dispatch(gotToken(data.token));
            dispatch(getTeacher(username, data.token));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}

function gotToken(token) {
    return { type: GET_TOKEN, payload: token };
}

function getTeacher(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}teachers/${username}`, { params: { _token } });
            dispatch(gotTeacher(data.teacher));
        }
        catch (e) {
            alert(e.response.data.message);
        }
    };
}
function getTeacherInfo(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}teachers/${username}`, { params: { _token } });
            dispatch(gotTeacherInfo(data.teacher));
        }
        catch (e) {
            console.log(e);
        }
    };
}

function gotTeacherInfo(teacher) {
    return { type: GET_TEACHER, payload: teacher };
}

function editTeacher(username, edits, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.patch(`${BASE_URL}teachers/${username}`, { _token, ...edits });
            dispatch(gotTeacher(data.teacher));
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}

function gotTeacher(teacher) {
    return { type: GET_USER, payload: teacher };
}

function getStudents(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}teachers/${username}/students`, { params: { _token } });
            dispatch(gotStudents(data.students));
        } catch (e) {
            if (e.response.data.status === 404) {
                dispatch(gotStudents([]));
            } else { console.log(e); }
        }

    };
}

function searchStudents(username, search, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}teachers/${username}/students`, { params: { search, _token } });
            console.log(data.students);
            dispatch(gotStudents(data.students));
        } catch (e) {
            if (e.response.data.status === 404) {
                dispatch(gotStudents([]));
            } else { console.log(e); }
        }

    };
}

function getOneStudent(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}students/${username}`, { params: { _token } });
            dispatch(gotStudents(data.student));
        } catch (e) {
            console.log(e);
        }
    };
}

function addStudent(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}teachers/${teacher_username}/add_student`, { student_username, _token });
            const { data } = await axios.get(`${BASE_URL}teachers/${teacher_username}/students`, { params: { _token } });
            dispatch(gotStudents(data.students));
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}


function removeStudent(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}teachers/${teacher_username}/remove_student`, { student_username, _token });
            const { data } = await axios.get(`${BASE_URL}teachers/${teacher_username}/students`, { params: { _token } });
            dispatch(gotStudents(data.students));
        } catch (e) {
            if (e.response.data.status === 404) {
                dispatch(gotStudents([]));
            } else { console.log(e); }
        }

    };
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
            alert(e.response.data.message);
        }
    };
}

function logout() {
    return { type: LOGOUT };
}


export { loginTeacher, signUpTeacher, getTeacher, logout, editTeacher, getStudents, deleteTeacher, addStudent, removeStudent, getTeacherInfo, getOneStudent, searchStudents };