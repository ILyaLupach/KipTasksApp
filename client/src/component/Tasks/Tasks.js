import React from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import {getAllTasks}  from "../../actions";
import WorkShopItem from "../TasksItem/TasksItem"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import "./Tasks.css";


class Tasks extends React.Component {
  serv = new ServerKip();
 
  componentDidMount(){
      this.serv.getAllTasks()
      .then(res => {
        this.props.getAllTasks(res)
      }) 
  } 



  render() {
    const tasks = this.props.store.tasks;
    return (
      <>
        <div className="workshoplist">{
            (
              !this.props.store.tasks ? (<h2>Loading...</h2>) : 
              tasks.map((item, i) => <WorkShopItem key={item._id} panel={`panel${i}`} {...item}/>)
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
}
const mapStateToProps = ({getReducer}) => ({
  store: getReducer
})

const mapDispatchToProps = dispatch => ({
  getAllTasks: (tasks) => dispatch(getAllTasks(tasks)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
