import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavMenu from './NavMenu';
import Link from '@material-ui/core/Link';
import { NoEncryption } from '@material-ui/icons';

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

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavMenu edge="start" className={classes.menuButton} color="inherit" aria-label="menu" />
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/" color="inherit">Music Lessons</Link>
                    </Typography>
                    <Button href="login" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
