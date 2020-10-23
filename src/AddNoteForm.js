import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, getStudents } from './actions/teachers';
import { createHomework } from './actions/homework';
import { createNote } from './actions/notes';


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

export default function AddHomworkForm({ teacher_username, student_username, lesson_id }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector((st) => st.token);

    const initialState = {
        note: "",
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
        const { note } = formData;
        try {
            dispatch(createNote(teacher_username, student_username, lesson_id, note, token));
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
                id="note"
                label="Note"
                name="note"
                autoComplete="note"
                autoFocus
                value={formData.note}
                onChange={handleChange}
            />
            <Button type="submit" className={classes.submit} variant="contained" >Add</Button>
        </form>
    );
}
