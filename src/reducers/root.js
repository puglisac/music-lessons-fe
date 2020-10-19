import { combineReducers } from "redux";
import token from "./token";
import lessons from "./lessons";

const rootReducer = combineReducers({ token, lessons });

export default rootReducer;
