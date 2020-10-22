import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getLessons, getOneLesson } from './actions/lessons';
import { useHistory } from "react-router-dom";

// Generate Order Data



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));



export default function LessonsList({ teacher_username, student_username }) {
    const { token } = useSelector((st) => st.token);

    const classes = useStyles();
    const { lessons } = useSelector((st) => st.lessons);
    const dispatch = useDispatch();
    const history = useHistory();
    const lessonDetails = (e) => {
        dispatch(getOneLesson(teacher_username, student_username, e.target.dataset.id, token));
        history.push("/lesson");
    };
    useEffect(() => {
        dispatch(getLessons(teacher_username, student_username, token));
    }, []);
    return (
        <React.Fragment>
            <Title>Lessons</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Teacher Username</TableCell>
                        <TableCell>Student Username</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(lessons) ? lessons.map((row) => (

                        <TableRow key={row.id}>
                            <Link onClick={lessonDetails}>
                                <TableCell data-id={row.id}>{row.date}</TableCell>
                            </Link>
                            <TableCell>{row.teacher_username}</TableCell>
                            <TableCell>{row.student_username}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}