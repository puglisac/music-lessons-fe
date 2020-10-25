import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import AddNoteForm from './AddNoteForm';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

function AddNoteButton() {
    const { lessons } = useSelector((st) => st.lessons);
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const id = open ? 'note-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Add note
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}><AddNoteForm teacher_username={lessons.teacher_username} student_username={lessons.student_username} lesson_id={lessons.id} /></Typography>
            </Popover>
        </>
    );
}
export default AddNoteButton;
