import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Title from './Title';
import { deleteHomework, getHomework } from './actions/homework';
import { useHistory } from "react-router-dom";
import { editHomework } from "./actions/homework";
import { Button } from '@material-ui/core';

// Generate Order Data



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));



export default function HomeworkList({ teacher_username, student_username, lesson_id }) {
    const { token } = useSelector((st) => st.token);

    const classes = useStyles();
    const { homework } = useSelector((st) => st.homework);
    const dispatch = useDispatch();
    const history = useHistory();
    const checkHomework = (id, completed) => {
        dispatch(editHomework(teacher_username, student_username, lesson_id, id, { completed: !completed }, token));
    };
    const removeHomework = (id) => {
        dispatch(deleteHomework(teacher_username, student_username, lesson_id, id, token));
    };

    useEffect(() => {
        dispatch(getHomework(teacher_username, student_username, lesson_id, token));
    }, []);
    return (
        <React.Fragment>
            <Title>Homework</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Homework</TableCell>
                        <TableCell>Completed</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(homework) ? homework.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell >{row.assignment}</TableCell>
                            <TableCell >{row.completed ? null : <Button onClick={() => checkHomework(row.id, row.completed)}
                            >Complete</Button>}</TableCell>
                            <TableCell ><Button onClick={() => removeHomework(row.id)}
                            >Delete</Button></TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}