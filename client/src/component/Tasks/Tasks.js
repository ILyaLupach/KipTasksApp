import React, { useState, useEffect } from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import {getAllTasks}  from "../../actions";
import TasksItem from "../TasksItem/TasksItem"
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import "./Tasks.css";

const useStyles = makeStyles(theme => ({
  button: {
    position: "fixed",
    bottom: -10,
    left: -10,
    margin: theme.spacing(1),
    width: "102%",
    backgroundColor: "#00a5d3",
    fontSize: 16,
    padding: 8,
    margun: 0
  }
}));


function Tasks ({store, getAllTasks}) {

  const classes = useStyles();
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
              tasks.map((item, i) => <TasksItem 
                key={item._id} 
                updateTasks={updateTasks} 
                deleteItem={serv.deleteItem}  
                panel={`panel${i}`} {...item}/>)
            )
          }
        </div>
        <Link to="/addTasks">
          <Button
            className={classes.button}           
            variant="contained"
            color="primary"
            size="large" >
              Добавить новую задачу
          </Button>  
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
