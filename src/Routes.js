import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";
import Home from "./Home";
import StudentDetails from "./StudentDetails";
import LessonDetails from './LessonDetails';

function Routes() {
    let home;
    const { user } = useSelector((st) => st.user);

    if (user) {
        if (user.is_teacher) home = <TeacherHome />;
        else home = <StudentHome />;
    } else home = <Home />;
    return (
        <div >
            <Switch>
                <Route exact path="/">
                    {home}
                </Route>
                <Route exact path="/signup">
                    <SignupForm />
                </Route>
                <Route exact path="/login">
                    <LoginForm />
                </Route>
                <Route exact path="/student/:student_username">
                    {user ? <StudentDetails /> : <Redirect to="/" />}
                </Route>
                <Route exact path="/lesson/:lesson_id">
                    {user ? <LessonDetails /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </div>
    );
}

export default Routes;