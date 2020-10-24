import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getStudents, removeStudent } from './actions/teachers';

import AreYouSure from './AreYouSure';



export default function StudentsList() {
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const { students } = useSelector((st) => st.students);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudents(user.username, token));
    }, [dispatch, user.username, token]);

    const deleteStudent = (student) => {
        dispatch(removeStudent(user.username, student, token));
    };



    return (
        <React.Fragment>
            <Title>Students</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(students) ? students.map((row) => (
                        <TableRow key={row.username}>
                            <TableCell><Link href={`student/${row.username}`} > {row.username}</Link></TableCell>
                            <TableCell>{row.full_name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell><AreYouSure type={row.username} id={row.username} removeFunction={deleteStudent} /></TableCell>

                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}