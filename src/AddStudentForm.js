import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, getStudents } from './actions/teachers';


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "green"
    },
}));

export default function AddStudentForm({ teacher_username }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector((st) => st.token);

    const initialState = {
        username: "",
    };
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username } = formData;
        try {
            dispatch(addStudent(teacher_username, username, token));
            setFormData(initialState);
        } catch (e) {
            alert(e);
        }
    };
    return (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Student username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
            />
            <Button type="submit" className={classes.submit} variant="contained" >Add</Button>
        </form>
    );
}
