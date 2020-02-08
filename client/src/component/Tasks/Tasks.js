import React from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import {getAllTasks, loadingTasks}  from "../../actions";
import TasksItem from "../TasksItem/TasksItem"
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import lodash from "lodash";
import "./Tasks.css";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import Preloader from "../Preloader/Preloader";
import sortBy from "../../secondaryFunctions/sortBy";
import sizeArr from "../../secondaryFunctions/sizeArr";


class Tasks extends React.Component  {
  
  serv = new ServerKip();


  state={ size: 100 }
  
  componentDidMount() {
    this.updateTasks();
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props){
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.props.loadingTasks(true);
  }
  

  updateTasks = () => {
    this.props.loadingTasks(true);
    this.serv.getAllTasks()
    .then(res => {
      this.props.getAllTasks(res);
      this.props.loadingTasks(false);
    });
  }
  myRef = React.createRef();

  scrollToBottom = () => {
    window.scrollTo(0, this.myRef.current.scrollHeight);
  }

  sizeUp = () => {
    this.setState(({size}) => this.state.size = size+50);
  }

  render() {

    const  tasks = sortBy(lodash.sortBy(this.props.store.tasks,  ["start"]), this.props.filterBy, this.props.searchQuery) ;
    sizeArr(tasks, this.state.size)
    
    return (
      <>

      <div className="workshoplist" ref={this.myRef}>
        <Preloader open={this.props.store.loading}/>
        {tasks.length && tasks.length >= 100 ? 
        <div className="addtaskstittle" 
          style={{ paddingBottom: 10, paddingTop: 10, marginBottom: 10, marginTop: 73, background: "#ffffff" }} 
          onClick={this.sizeUp}>
          <NavigationIcon />
        </div> : ""}
        {
          (
            !tasks ? (<h2>Loading...</h2>) : 
            sizeArr(tasks).map((item, i, arr) => {
                let visibleDate = true;
                if(i > 0) {
                  if(new Date(item.date).getDate() === new Date(arr[i-1].date).getDate()) visibleDate=false ;
                  else visibleDate=true;
                }

              return (<TasksItem 
                key={item._id} 
                num={i}
                mark={ item.mark ? item.mark : false }
                updateTasks={this.updateTasks} 
                deleteItem={this.serv.deleteItem}  
                panel={`panel${i}`} {...item}
                visibleDate={visibleDate}/>)})
          )
        }
        <div ></div>
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
