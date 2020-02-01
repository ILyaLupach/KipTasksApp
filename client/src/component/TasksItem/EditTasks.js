import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import TimeInput from 'material-ui-time-picker';

import ServerKip from "../../services/services";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}));


export default function EditTasks({failure, fix, id, name, start, finish, object, position, updateTasks}) {
  const classes = useStyles();



  const serv = new ServerKip();

  const [open, setOpen] = React.useState(false);

  const [editTask, setEditTask] = React.useState({
    name: name.join(", "),
    failure: failure,
    fix: fix,
    start: new Date(start),
    finish: new Date(finish),
    position: position,
    object: object
});


  const handleChange = (event) => {
    switch (event.target.id) {

      case "name":
        setEditTask({
          ...editTask,
          name: event.target.value
        }); 
        break;

      case "position":
        setEditTask({
          ...editTask,
          position: event.target.value
        }); 
        break;
        
      case "object":
        setEditTask({
          ...editTask,
          object: event.target.value
        }); 
        break;

      case "failure":
        setEditTask({
          ...editTask,
          failure: event.target.value
        }); 
        break;

      case "fix":
        setEditTask({
          ...editTask,
          fix: event.target.value
        })
        break;
   
      default: break;
    }

  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handlePost = () => {
    serv.updateData("tasks", id, editTask);
    updateTasks();
    handleClose(); 
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleStartChange = (date) => {
    setEditTask({
      ...editTask,
      start: date
    }); 
  }
  const handleFinishChange = (date) => {
    setEditTask({
      ...editTask,
      finish: date
    }); 
  }





  return (
    <>

        <Button
          onClick={handleClickOpen} 
          color="primary">
                    <h5>редактировать</h5>
        </Button>


      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off">

             <TimeInput
              style={{ maxWidth: "33vw", margin: 5 }}
              mode='24h'
              value={editTask.start}
              onChange={handleStartChange}/>
            <TimeInput
              style={{ maxWidth: "33vw", margin: 5 }}
              mode='24h'
              value={editTask.finish}
              onChange={handleFinishChange}
            />  


              <TextField value={editTask.name}  onChange={handleChange} id="name" label="Работники" />
              <TextField value={editTask.position}  onChange={handleChange} id="position" label="цех" />
              <TextField value={editTask.object}  onChange={handleChange} id="object" label="объект" />
              <TextField value={editTask.failure}  onChange={handleChange} id="failure" label="Проблема" />
              <TextField value={editTask.fix} onChange={handleChange} multiline rows="4" id="fix" label="Решение" />  
            </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
