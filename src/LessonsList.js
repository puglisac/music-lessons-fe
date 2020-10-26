import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { deleteLesson, getLessons, searchLessons } from './actions/lessons';
import AreYouSure from './AreYouSure';
import FilterField from './FilterField';
import Pagination from './Pagination';

export default function LessonsList({ teacher_username, student_username }) {
    const { token } = useSelector((st) => st.token);
    const { lessons } = useSelector((st) => st.lessons);
    const { user } = useSelector((st) => st.user);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();


    const removeLesson = (id) => {
        dispatch(deleteLesson(teacher_username, student_username, id, token));
    };

    const search = async (text) => {
        dispatch(searchLessons(teacher_username, student_username, text, token));
    };

    useEffect(() => {
        dispatch(getLessons(teacher_username, student_username, token));
    }, [dispatch, student_username, teacher_username, token]);

    const lessonsArray = (start) => {
        const end = start + 9;
        return lessons.slice(start, end);
    };
    let lessonsPages;

    if (Array.isArray(lessons)) {
        lessonsPages = lessonsArray(page);
    }

    const pageUp = () => {
        setPage(page + 10);
    };

    const pageDown = () => {
        setPage(page - 10);
    };
    if (page > lessons.length) {
        setPage(lessons.length - 10);
    }
    if (page < 0) {
        setPage(0);
    }
    console.log(page);

    return (
        <React.Fragment>
            <Title>Lessons</Title>
            <FilterField search={search} format="MM/DD/YYYY" />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Teacher Username</TableCell>
                        <TableCell>Student Username</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lessonsPages ? lessonsPages.map((row) => (

                        <TableRow key={row.id}>
                            <TableCell >
                                <Link href={`/lesson/${row.id}`}>{new Date(row.date).toLocaleDateString()}</Link>
                            </TableCell>
                            <TableCell>{row.teacher_username}</TableCell>
                            <TableCell>{row.student_username}</TableCell>
                            {user.is_teacher ? <TableCell><AreYouSure
                                type="lesson" id={row.id}
                                removeFunction={removeLesson} /></TableCell> : null}
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
            <Pagination up={pageUp} down={pageDown} />
        </React.Fragment>
    );
}