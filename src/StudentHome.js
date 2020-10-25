

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from './Copyright';
import LessonsList from './LessonsList';
import UserInfo from "./UserInfo";
import { getTeacherInfo } from './actions/teachers';


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

export default function StudentHome() {
    const dispatch = useDispatch();
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const { teacher } = useSelector((st) => st.teacher);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        dispatch(getTeacherInfo(user.teacher_username, token));
    }, [dispatch, user.teacher_username, token]);

    return (
        <div className={classes.root}>
            <CssBaseline />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* user info */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={fixedHeightPaper}>
                                <UserInfo title="Your info:" user={user} teacher={teacher} />
                            </Paper>
                        </Grid>
                        {/* Lessons */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <LessonsList
                                    teacher_username={user.teacher_username}
                                    student_username={user.username} />
                            </Paper>
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