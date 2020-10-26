import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Pagination({ up, down }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={down}>Prev</Button>
                <Button onClick={up}>Next</Button>
            </ButtonGroup>

        </div>
    );
}
