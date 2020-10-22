

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import Copyright from './Copyright';
import StudentsList from './StudentsList';
import UserInfo from "./UserInfo";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import AddStudentForm from './AddStudentForm';

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

export default function StudentHome() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const { user } = useSelector((st) => st.user);
    const classes = useStyles();
    const { token } = useSelector((st) => st.token);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                                <UserInfo title="Your info:" user={user} />
                            </Paper>
                        </Grid>
                        {/* Students */}
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <StudentsList />
                            </Paper>
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                Add student
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
                                <Typography className={classes.typography}><AddStudentForm teacher_username={user.username} /></Typography>
                            </Popover>
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