import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function FilterField({ search, format }) {
    const classes = useStyles();

    const INITIAL_STATE = { text: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        search(formData.text);
    };

    /** Update local state w/curr state of input elem */

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off">
            <TextField id="search"
                name="text"
                value={formData.text}
                onChange={handleChange}
                label={format ? format : "Filter"} />
        </form>
    );
}
