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
import { getHomework } from './actions/homework';
import { useHistory } from "react-router-dom";

// Generate Order Data



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));



export default function NotesList({ teacher_username, student_username, id }) {
    const { token } = useSelector((st) => st.token);

    const classes = useStyles();
    const { notes } = useSelector((st) => st.notes);
    const dispatch = useDispatch();
    const homework = useHistory();

    useEffect(() => {
        dispatch(getHomework(teacher_username, student_username, id, token));
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
                            <TableCell data-id={row.id}>{row.assignment}</TableCell>
                            <TableCell data-id={row.id}><Checkbox value={row.completed ? true : false}
                                color="primary"
                            /></TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}