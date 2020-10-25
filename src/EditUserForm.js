import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { deleteTeacher, editTeacher } from "./actions/teachers";
import { deleteStudent, editStudent } from "./actions/students";
import AreYouSure from './AreYouSure';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function EditUserForm({ close }) {
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const BASE_URL = "http://localhost:5000/";

    const initialState = {
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        password: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    const login = async (username, password) => {

        if (user.is_teacher) {
            try {
                return await axios.post(`${BASE_URL}teachers/login`, { username, password });
            } catch (e) {
                alert(e.response.data.message);
            }
        } else {
            try {
                await axios.post(`${BASE_URL}students/login`, { username, password });
            } catch (e) {
                alert(e.response.data.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, full_name, email } = formData;

        if (user.is_teacher) {
            try {
                if (await login(user.username, password)) {
                    dispatch(editTeacher(user.username, { full_name, email }, token));
                    close();
                }
            } catch (e) {
                console.log(e);
            }
        } else if (await login(user.username, password)) {
            try {
                dispatch(editStudent(user.username, { full_name, email }, token));
                close();
            } catch (e) {
                console.log(e);
            }
        }
    };

    const deleteUser = async (username) => {
        const { password } = formData;
        if (user.is_teacher) {
            try {
                if (await login(username, password)) {
                    dispatch(deleteTeacher(username, token));
                    history.push("/");
                }
            } catch (e) {
                console.log(e);
            }
        } else if (await login(username, password)) {
            try {
                dispatch(deleteStudent(username, token));
                history.push("/");
            } catch (e) {
                console.log(e);
            }
        }

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Profile
        </Typography>
                <form onSubmit={handleSubmit} className={classes.form} >
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="full_name"
                                autoComplete="fullName"
                                value={formData.full_name}
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="email"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Confirm password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}

                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Edit
                    </Button>
                </form>
                <AreYouSure type="accout"
                    removeFunction={deleteUser}
                    id={user.username} />
            </div>

        </Container>
    );
}