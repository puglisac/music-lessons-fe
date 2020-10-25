import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavMenu from './NavMenu';
import { logout } from './actions/teachers';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const { token } = useSelector((st) => st.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const logoutUser = () => {
        dispatch(logout());
        history.push("/");
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavMenu edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu" />
                    <Typography variant="h6" className={classes.title}>
                        <Button href="/" color="inherit">Music Lessons</Button>
                    </Typography>
                    {token ? <Button onClick={logoutUser}
                        color="inherit">Logout</Button> :
                        <Button href="login"
                            color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
}
