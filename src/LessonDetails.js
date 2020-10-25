

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from './Copyright';
import NotesList from './NotesList';
import HomeworkList from './HomeworkList';
import { getOneLesson } from './actions/lessons';
import AddHomeworkButton from './AddHomeworkButton';
import AddNoteButton from "./AddNoteButton";

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

    const dispatch = useDispatch();
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const { students } = useSelector((st) => st.students);
    const { lessons } = useSelector((st) => st.lessons);
    const { lesson_id } = useParams();
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let teacher_username;
    teacher_username = students ? students.teacher_username : user.teacher_username;

    let student_username;
    student_username = students ? students.username : user.username;

    useEffect(() => {
        dispatch(getOneLesson(teacher_username, student_username, lesson_id, token));
    }, [dispatch, lesson_id, student_username, teacher_username, token]);



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
                                <h2>Date: {new Date(lessons.date).toLocaleDateString()}</h2>
                                <h4>Teacher: {lessons.teacher_username} </h4>
                                <h4>Student: {lessons.student_username} </h4>
                            </Paper>
                        </Grid>
                        {/* notes */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <NotesList teacher_username={teacher_username}
                                    student_username={student_username}
                                    lesson_id={lesson_id} />
                            </Paper>
                            {user.is_teacher ? <AddNoteButton /> : null}
                        </Grid>
                        {/* homework */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <HomeworkList teacher_username={teacher_username}
                                    student_username={student_username}
                                    lesson_id={lesson_id} />
                            </Paper>
                            {user.is_teacher ? <AddHomeworkButton /> : null}
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