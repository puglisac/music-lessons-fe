import axios from "axios";
import { GET_TOKEN, GET_USER, LOGOUT, GET_STUDENTS, GET_TEACHER, BASE_URL } from "./actionTypes";


// login a teacher, update token state and get teacher by username
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

// signup a teacher, update token state and get teacher by username
function signUpTeacher(username, password, full_name, email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}teachers/signup`,
                { username, password, full_name, email });
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

// get teacher by username and update user state
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

// get info on a teacher and update teacher state
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

// edit teacher info and get teacher by username
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

// get students of a teacher by username and upate students state
function getStudents(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}teachers/${username}/students`,
                { params: { _token } });
            dispatch(gotStudents(data.students));
        } catch (e) {
            if (e.response.data.status === 404) {
                dispatch(gotStudents([]));
            } else { console.log(e); }
        }

    };
}

// search students of teacher by username and update students state
function searchStudents(username, search, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}teachers/${username}/students`,
                { params: { search, _token } });
            console.log(data.students);
            dispatch(gotStudents(data.students));
        } catch (e) {
            if (e.response.data.status === 404) {
                dispatch(gotStudents([]));
            } else { console.log(e); }
        }

    };
}

// get one student of teacher and update students state
function getOneStudent(username, _token) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}students/${username}`,
                { params: { _token } });
            dispatch(gotStudents(data.student));
        } catch (e) {
            console.log(e);
        }
    };
}

// add student to teacher by username and update students state
function addStudent(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}teachers/${teacher_username}/add_student`,
                { student_username, _token });
            const { data } = await axios.get(`${BASE_URL}teachers/${teacher_username}/students`,
                { params: { _token } });
            dispatch(gotStudents(data.students));
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}

// remove student from teacher by username and update students state
function removeStudent(teacher_username, student_username, _token) {
    return async function (dispatch) {
        try {
            await axios.patch(`${BASE_URL}teachers/${teacher_username}/remove_student`,
                { student_username, _token });
            const { data } = await axios.get(`${BASE_URL}teachers/${teacher_username}/students`,
                { params: { _token } });
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

// delete a teacher and logout
function deleteTeacher(username, _token) {
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}teachers/${username}/`, { params: { _token } });
            dispatch(logout());
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}

// logout teacher
function logout() {
    return { type: LOGOUT };
}


export { loginTeacher, signUpTeacher, getTeacher, logout, editTeacher, getStudents, deleteTeacher, addStudent, removeStudent, getTeacherInfo, getOneStudent, searchStudents };