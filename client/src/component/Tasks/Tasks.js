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
import lodash from "lodash";
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





class Tasks extends React.Component  {
  

  componentDidMount() {
    this.updateTasks();
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  
    serv = new ServerKip();


    updateTasks = () => {
    this.serv.getAllTasks()
      .then(res => {
        this.props.getAllTasks(res)
    }) 
  }
   myRef = React.createRef();

   scrollToBottom = () => {
    if(this.myRef.current){
      console.log(this.myRef.current.scrollHeight)
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }



render() {


  const  tasks = lodash.sortBy(this.props.store.tasks,  ["date"]) ;
  
  return (
    <>
      <div className="workshoplist" >{
          (
            !tasks ? (<h2>Loading...</h2>) : 
            tasks.map((item, i, arr) => {
                let visibleDate = true;
                if(i > 0) {
                  if(new Date(item.date).getDate() == new Date(arr[i-1].date).getDate()) visibleDate=false ;
                  else visibleDate=true;
                }

              return (<TasksItem 
                key={item._id} 
                num={i}
                updateTasks={this.updateTasks} 
                deleteItem={this.serv.deleteItem}  
                panel={`panel${i}`} {...item}
                visibleDate={visibleDate}/>)})
          )
        }
        <div ref={this.myRef}></div>
      </div>

      <Link to="/addTasks">
        <Button
          className="addTaskButton"
          variant="contained"
          color="primary"
          size="large" >
            Добавить новую задачу
        </Button>  
      </Link>

    </>
  )
}
  }

const mapStateToProps = ({tasksReducer}) => ({
  store: tasksReducer
})

const mapDispatchToProps = dispatch => ({
  getAllTasks: (tasks) => dispatch(getAllTasks(tasks)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
