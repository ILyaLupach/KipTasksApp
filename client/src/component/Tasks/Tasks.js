import React, { useState, useEffect } from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import {getAllTasks}  from "../../actions";
import TasksItem from "../TasksItem/TasksItem"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import "./Tasks.css";


function Tasks ({store, getAllTasks}) {

  const serv = new ServerKip();

  useEffect(() => {
    updateTasks()
  }, []);

  const updateTasks = () => {
    serv.getAllTasks()
      .then(res => {
        getAllTasks(res)
    }) 
  }


    const tasks = store.tasks;

    return (
      <>
        <div className="workshoplist">{
            (
              !tasks ? (<h2>Loading...</h2>) : 
              tasks.map((item, i) => <TasksItem key={item._id} panel={`panel${i}`} {...item}/>)
            )
          }
        </div>
        <Link to="/addTasks">
          <Fab className="addIcon" color="primary" aria-label="add">
              <AddIcon />
          </Fab>        
        </Link>

      </>
    )
  }

const mapStateToProps = ({tasksReducer}) => ({
  store: tasksReducer
})

const mapDispatchToProps = dispatch => ({
  getAllTasks: (tasks) => dispatch(getAllTasks(tasks)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
