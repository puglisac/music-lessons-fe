import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default function UserInfo({ title, user, teacher }) {


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
