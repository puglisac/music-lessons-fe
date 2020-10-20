import { combineReducers } from "redux";
import token from "./token";
import lessons from "./lessons";
import notes from "./notes";
import students from "./students";
import user from "./user";
import homework from "./homework";

const rootReducer = combineReducers({ token, lessons, notes, students, user, homework });

export default rootReducer;
