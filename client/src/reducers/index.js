  
import {combineReducers} from "redux";
import tasksReducer from "./tasks";
import workshopsReducers from "./workshops";
import personsReducers from "./persons";

export default combineReducers({
    tasksReducer: tasksReducer,
    workshopsReducers: workshopsReducers,
    personsReducers: personsReducers
})