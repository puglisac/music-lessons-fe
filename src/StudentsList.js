import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getStudents, getOneStudent, removeStudent } from './actions/teachers';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

// Generate Order Data



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));



export default function StudentsList() {
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);
    const classes = useStyles();
    const { students } = useSelector((st) => st.students);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudents(user.username, token));
    }, [dispatch, user.username, token]);

    const studentDetails = (e) => {
        dispatch(getOneStudent(e.target.innerText, token));
        history.push("/student");
    };

    const deleteStudent = (username) => {
        dispatch(removeStudent(user.username, username, token));
    };

    console.log(students);

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
                            <TableCell><Link onClick={studentDetails}>{row.username}</Link></TableCell>
                            <TableCell>{row.full_name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell><Button onClick={() => deleteStudent(row.username)}>delete</Button></TableCell>

                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}