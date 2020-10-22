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
import { getStudents } from './actions/teachers';

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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudents(user.username, token));
    }, []);
    return (
        <React.Fragment>
            <Title>Students</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students ? students.map((row) => (
                        <TableRow key={row.username}>
                            <TableCell>{row.full_name}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.email}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}