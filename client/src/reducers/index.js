  
import {combineReducers} from "redux";
import tasksReducer from "./tasks";
import workshopsReducers from "./workshops";
import personsReducers from "./persons";
import filterReducers from "./filter";

export default combineReducers({
    filterReducers: filterReducers,
    tasksReducer: tasksReducer,
    workshopsReducers: workshopsReducers,
    personsReducers: personsReducers
})