import React from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import {getAllTasks, loadingTasks}  from "../../actions";
import TasksItem from "../TasksItem/TasksItem"
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import lodash from "lodash";
import "./Tasks.css";

import Preloader from "../Preloader/Preloader"
import sortBy from "../../secondaryFunctions/sortBy"


class Tasks extends React.Component  {
  

  componentDidMount() {
    this.updateTasks();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.loadingTasks(true);
  }
  
    serv = new ServerKip();


    updateTasks = () => {
      this.props.loadingTasks(true);
      this.serv.getAllTasks()
      .then(res => {
        this.props.getAllTasks(res);
        setTimeout(() => {
          this.props.loadingTasks(false);
        }, 1000);
    });
  }
   myRef = React.createRef();

   scrollToBottom = () => {
    if(this.myRef.current){
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }



render() {


  const  tasks = sortBy(lodash.sortBy(this.props.store.tasks,  ["date"]), this.props.filterBy, this.props.searchQuery) ;

  
  return (
    <>
      <div className="workshoplist" >
        
        <Preloader open={this.props.store.loading}/>

        {
          (
            !tasks ? (<h2>Loading...</h2>) : 
            tasks.map((item, i, arr) => {
                let visibleDate = true;
                if(i > 0) {
                  if(new Date(item.date).getDate() === new Date(arr[i-1].date).getDate()) visibleDate=false ;
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

const mapStateToProps = ({tasksReducer, filterReducers}) => ({
  store: tasksReducer,
  filterBy: filterReducers.filterBy,
  searchQuery: filterReducers.searchQuery
})

const mapDispatchToProps = dispatch => ({
  getAllTasks: (tasks) => dispatch(getAllTasks(tasks)),
  loadingTasks:  (bool) => dispatch(loadingTasks(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
