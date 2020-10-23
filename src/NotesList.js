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
import { getNotes } from './actions/notes';
import { useHistory } from "react-router-dom";

// Generate Order Data



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));



export default function NotesList({ teacher_username, student_username, lesson_id }) {
    const { token } = useSelector((st) => st.token);

    const classes = useStyles();
    const { notes } = useSelector((st) => st.notes);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getNotes(teacher_username, student_username, lesson_id, token));
    }, []);
    return (
        <React.Fragment>
            <Title>Notes</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(notes) ? notes.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell data-id={row.id}>{row.note}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}