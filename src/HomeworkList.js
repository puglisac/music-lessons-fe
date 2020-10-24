import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { deleteHomework, getHomework } from './actions/homework';
import { editHomework } from "./actions/homework";
import { Button } from '@material-ui/core';




export default function HomeworkList({ teacher_username, student_username, lesson_id }) {
    const { token } = useSelector((st) => st.token);
    const { user } = useSelector((st) => st.user);
    const { homework } = useSelector((st) => st.homework);
    const dispatch = useDispatch();

    const checkHomework = (id, completed) => {
        dispatch(editHomework(teacher_username, student_username, lesson_id, id, { completed: !completed }, token));
    };

    const removeHomework = (id) => {
        if (!user.is_teacher) {
            alert("Only your teacher can delete a homework assignment!");
        }
        dispatch(deleteHomework(teacher_username, student_username, lesson_id, id, token));
    };

    useEffect(() => {
        dispatch(getHomework(teacher_username, student_username, lesson_id, token));
    }, [dispatch, lesson_id, student_username, teacher_username, token]);

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
                            <TableCell >{row.completed ? "Yes" : <Button onClick={() => checkHomework(row.id, row.completed)}
                            >Complete</Button>}
                            </TableCell>
                            {user.is_teacher ? <TableCell ><Button onClick={() => removeHomework(row.id)}
                            >Delete</Button></TableCell> : null}
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}