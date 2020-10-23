

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createLesson } from './actions/lessons';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";
import Copyright from './Copyright';
import LessonsList from './LessonsList';
import UserInfo from "./UserInfo";
import { getOneStudent, getTeacherInfo } from './actions/teachers';

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
}));

export default function StudentDetails() {



    const dispatch = useDispatch();
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const { students } = useSelector((st) => st.students);
    const { student_username } = useParams();
    useEffect(() => {
        dispatch(getOneStudent(student_username, token));
    }, [dispatch]);

    const handleClick = () => {
        dispatch(createLesson(user.username, students.username, token));
    };
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
                                <h2>{students.username}</h2>
                                <h4>{students.email} </h4>
                            </Paper>
                        </Grid>
                        {/* Lessons */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <LessonsList teacher_username={user.username} student_username={student_username} />
                            </Paper>
                            <Button variant="contained" color="primary" onClick={handleClick}>
                                Add lesson
                            </Button>

                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}