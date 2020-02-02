import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

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


export default function EditPerson( {name, surname, phone, position, id, updatePersons} ) {
  const classes = useStyles();
 
  const serv = new ServerKip();

  const [open, setOpen] = React.useState(false);

  const [editPerson, setEditPerson] = React.useState({
    name: name,
    surname: surname,
    phone: phone,
    position: position
})


  const handleChange = (event) => {
    switch (event.target.id) {

      case "name":
        setEditPerson({
          ...editPerson,
          name: event.target.value
        }); 
        break;

      case "surname":
        setEditPerson({
          ...editPerson,
          surname: event.target.value
        }); 
        break;

      case "phone":
        setEditPerson({
          ...editPerson,
          phone: event.target.value
        }); 
        break;

      case "position":
        setEditPerson({
          ...editPerson,
          position: event.target.value
        }); 
        break;
   
      default: break;
    }

  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handlePost = () => {
    serv.updateData("persons", id, editPerson);
    updatePersons();
    handleClose(); 
  }

  const handleClose = () => {
    setOpen(false);
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

              <TextField value={editPerson.surname}  onChange={handleChange} id="surname" label="Фамилия" />
              <TextField value={editPerson.name}  onChange={handleChange} id="name" label="Имя" />
              <TextField value={editPerson.phone}  onChange={handleChange} id="phone" label="Телефон" />
              <TextField value={editPerson.position}  onChange={handleChange} id="position" label="Должность" />
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
