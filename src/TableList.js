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



export default function TableList({ title, columns }) {
    const { students } = useSelector((st) => st.students);
    const { user } = useSelector((st) => st.user);
    const { token } = useSelector((st) => st.token);

    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudents(user.username, token));
    }, []);
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((c) => <TableCell>{c}</TableCell>)}
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