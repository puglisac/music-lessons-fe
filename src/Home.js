import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Box, CssBaseline } from '@material-ui/core';
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80vw",
    },
    media: {
        height: 140,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="home_img.jpg"
                            title="music teacher"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Welcome to Music Lessons
          </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Music Lessons is a tool for private lesson teachers and students.  Create an account or login to get started!
          </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button href="/login" size="small" color="primary">
                            Login
        </Button>
                        <Button href="/signup" size="small" color="primary">
                            Signup
        </Button>
                    </CardActions>
                </Card>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
