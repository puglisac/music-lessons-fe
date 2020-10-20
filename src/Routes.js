import React from "react";
import { Switch, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Routes() {
    return (
        <div >
            <Switch>
                <Route exact path="/signup">
                    <SignupForm />
                </Route>
                <Route exact path="/login">
                    <LoginForm />
                </Route>
            </Switch>
        </div>
    );
}

export default Routes;