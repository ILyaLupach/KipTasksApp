import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {getAllTasks}  from "../../actions";
import lodash from "lodash";
import ServerKip from "../../services/services";

import sizeArr from "../../secondaryFunctions/sizeArr";

import PrintFilter from "./PrintFilter";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    padding: 2,
    paddingLeft: 5
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {

      backgroundColor: theme.palette.background.white,

  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    zIndex: 99,
    position: "absolute",
    top: 0,
    left: 0
  }
});


function PrintList({store, getAllTasks}) {

  const classes = useStyles();
  
  const serv = new ServerKip();

  const [state, setState] = React.useState(store)

  React.useEffect(() => {
    serv.getAllTasks()
    .then(res => {
    getAllTasks(res);})
  }, [state])

  const [open, setOpen] = React.useState(true);
  const [searchWith, setSearchWith] = React.useState(new Date());
  const [searchBy, setSearchBy] = React.useState(new Date());

  const firmatTime = (time) => {
    if (time < 10) {
      return time = "0" + time}
    else return time
  }


  const  tasks = lodash.sortBy(store,  ["date"]).reverse();
  if(!tasks && tasks.length < 1) return (<h2> Loading </h2>)

  const sortTasks = tasks.filter((item) => new Date(item.date) >= searchWith && new Date(item.date) <= searchBy)

  sizeArr(tasks, 1000);

  return (
    <>
    <div className="printlist"></div>
      <PrintFilter open={open} setOpen={setOpen}
      searchWith={searchWith} searchBy={searchBy} 
      setSearchWith={setSearchWith} setSearchBy={setSearchBy} />
     { !sortTasks ? "" : <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell onClick={()=>setOpen(true)} style={{ minWidth: 100 }} align="left">Дата</StyledTableCell>
            <StyledTableCell onClick={()=>setOpen(true)} style={{ minWidth: 100 }} align="left">Время устранения</StyledTableCell>
            <StyledTableCell onClick={()=>setOpen(true)} style={{ minWidth: 180 }} align="left">Ф.И.О. работников</StyledTableCell>
            <StyledTableCell onClick={()=>setOpen(true)} style={{ minWidth: 200 }} align="left">Цех</StyledTableCell>
            <StyledTableCell onClick={()=>setOpen(true)} style={{ minWidth: 150 }} align="left">Проблема</StyledTableCell>
            <StyledTableCell onClick={()=>setOpen(true)} style={{ minWidth: 220 }} align="left">Решение</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortTasks.map((task,i) => (
            <StyledTableRow key={task._id}>

              <StyledTableCell align="left"> {`${firmatTime(new Date(task.date).getDate())} / ${firmatTime(new Date(task.date).getMonth() + 1)} / ${new Date(task.date).getFullYear()}`}</StyledTableCell>
              <StyledTableCell align="left">{`${firmatTime(new Date(task.start).getHours())}:${firmatTime(new Date(task.start).getMinutes())} - ${firmatTime(new Date(task.finish).getHours())}:${firmatTime(new Date(task.finish).getMinutes())}`}</StyledTableCell>
              <StyledTableCell align="left"> {task.name.join(", ")} </StyledTableCell>
              <StyledTableCell align="left">{`${task.position} (${task.object})`}</StyledTableCell>
              <StyledTableCell align="left">{task.failure}</StyledTableCell>
              <StyledTableCell align="left">{task.fix}</StyledTableCell> 
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> }
    </>
    );
}
const mapStateToProps = ({tasksReducer}) => ({
  store: tasksReducer.tasks,
})

const mapDispatchToProps = dispatch => ({
  getAllTasks: (tasks) => dispatch(getAllTasks(tasks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintList);
