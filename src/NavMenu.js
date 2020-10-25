import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import { Home, MusicNote, LocalLibrary } from '@material-ui/icons';




const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItemLink href="/" button >
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemLink>
            </List>
            <Divider />
            <List>
                <ListItemLink href="https://www.imusic-school.com/en/tools/online-metronome/" target="_blank" button >
                    <ListItemIcon><MusicNote /></ListItemIcon>
                    <ListItemText primary="Metronome" />
                </ListItemLink>
                <ListItemLink href="https://www.musictheory.net/lessons" target="_blank" button >
                    <ListItemIcon><LocalLibrary /></ListItemIcon>
                    <ListItemText primary="Music Theory" />
                </ListItemLink>
            </List>
        </div>
    );

    return (
        <div>
            {
                <React.Fragment key="left">
                    <IconButton color="inherit" onClick={toggleDrawer("left", true)}><MenuIcon /></IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                        onOpen={toggleDrawer("left", true)}
                    >
                        {list("left")}
                    </SwipeableDrawer>
                </React.Fragment>
            }
        </div>
    );
}
