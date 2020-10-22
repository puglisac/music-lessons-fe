

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import Copyright from './Copyright';
import NotesList from './NotesList';
import HomeworkList from './HomeworkList';
import LessonsList from './LessonsList';
import UserInfo from "./UserInfo";
import { getTeacherInfo } from './actions/teachers';
import AddHomworkForm from './AddHomeworkForm';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import AddNoteForm from './AddNoteForm';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function LessonDetails() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const dispatch = useDispatch();
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const { students } = useSelector((st) => st.students);
    const { lessons } = useSelector((st) => st.lessons);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* student info */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Date: {lessons.date}</h2>
                                <h4>Teacher: {lessons.teacher_username} </h4>
                                <h4>Student: {lessons.student_username} </h4>
                            </Paper>
                        </Grid>
                        {/* notes */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <NotesList teacher_username={lessons.teacher_username} student_username={lessons.student_username} id={lessons.id} />
                            </Paper>
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
                                <Typography className={classes.typography}><AddNoteForm teacher_username={lessons.teacher_username} student_username={lessons.student_username} id={lessons.id} /></Typography>
                            </Popover>
                        </Grid>
                        {/* homework */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <HomeworkList teacher_username={lessons.teacher_username} student_username={lessons.student_username} id={lessons.id} />
                            </Paper>
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                Add homework
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
                                <Typography className={classes.typography}><AddHomworkForm teacher_username={lessons.teacher_username} student_username={lessons.student_username} id={lessons.id} /></Typography>
                            </Popover>
                        </Grid>
                    </Grid>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div >
    );
}