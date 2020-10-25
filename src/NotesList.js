import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { deleteNote, getNotes } from './actions/notes';




export default function NotesList({ teacher_username, student_username, lesson_id }) {
    const { token } = useSelector((st) => st.token);
    const { notes } = useSelector((st) => st.notes);
    const { user } = useSelector((st) => st.user);

    const dispatch = useDispatch();

    const removeNote = (id) => {

        dispatch(deleteNote(teacher_username, student_username, lesson_id, id, token));
    };

    useEffect(() => {
        dispatch(getNotes(teacher_username, student_username, lesson_id, token));
    }, [dispatch, lesson_id, student_username, teacher_username, token]);

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
                            {user.is_teacher ? <TableCell ><Button onClick={() => removeNote(row.id)}
                            >Delete</Button></TableCell> : null}
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}