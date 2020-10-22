import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function UserInfo({ title, user, teacher }) {

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h5" component="h2">
                {title}
            </Typography>
            <Typography variant="h5" component="h2">
                {user.full_name}
            </Typography>

            <Typography variant="body2" component="p">
                username: {user.username} <br />
                    email: {user.email}
                <br />
            </Typography>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
            {teacher ? <Typography variant="body2" component="p">
                Teacher: {teacher.username} <br />
                    Teacher email: {teacher.email}
                <br />
            </Typography> : null}
        </div>
    );
}
