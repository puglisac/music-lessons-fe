import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createHomework } from './actions/homework';

const useStyles = makeStyles((theme) => ({

    form: {
        width: '100%',
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
        homework: "",
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
        const { homework } = formData;
        try {
            dispatch(createHomework(teacher_username, student_username, lesson_id, homework, token));
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
                id="homework"
                label="Assignment"
                name="homework"
                autoComplete="homework"
                autoFocus
                value={formData.homework}
                onChange={handleChange}
            />
            <Button type="submit" className={classes.submit} variant="contained" >Add</Button>
        </form>
    );
}
