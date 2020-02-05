import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {getAllWorkshops}  from "../../actions";
import { Alert, AlertTitle } from '@material-ui/lab';
import ServerKip from "../../services/services";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

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
  },listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  }
}));


function EditWorkShopsList({workshops, getAllWorkshops}) {

  const classes = useStyles();

  const serv = new ServerKip();

  const [open, setOpen] = React.useState(false);
  const [complited, setComplited] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [workShopsName, setWorkShopsName] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleOk = () => {
    if(workShopsName && workShopsName.length > 3){
    serv.addNewWorkShops({name: workShopsName})
      .then(res => {
        if(res.ok) {
          setWorkShopsName("")
          setComplited(true);
          setTimeout(() => {
            setOpen(false);
            serv.getAllWorkshops()
              .then(res => {
                getAllWorkshops(res)
            });
            setComplited(true); 
          }, 1000);
        } else setError(true);
      })
    }
    else  setOpen(false);
  }


  const handleChangeName = event => {
    setWorkShopsName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const deletedPosition = (id) => {
    serv.deleteItem(id, "workshops");
    setTimeout(() => {
      updateWorkshops()
    }, 1000); 
    
  }

  const deletedObject = (workshop, i) => {
    const newWorkShop = workshop.object.filter((item, id) => id !== i );
    serv.updateData("workshops", workshop._id, {object: newWorkShop})
    setTimeout(() => {
      updateWorkshops()
    }, 1000); 
  }

  const updateWorkshops = () => {
    serv.getAllWorkshops()
      .then(res => {
        getAllWorkshops(res)
    }) 
  }

  if(error) {
    return (
      <div className={classes.root}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Что-то пошло не так! Проверьте интернет соединение и перезагрузите страницу
        </Alert>
      </div>
      )
  }

  if(complited ) {
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <Alert severity="success"> Новый элемент добавлен </Alert>
      </Dialog> )
  }

  return (
    <>
      <span onClick={handleClickOpen}>Цех</span>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>

          <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Название нового цеха"  onChange={handleChangeName}  />
        </form>

        { workshops && workshops.length > 0 ? <List className={classes.root} subheader={<li />}>
          {workshops.map(sectionId => (
            <li key={sectionId._id} className={classes.listSection}>
              <ul className={classes.ul}>
                <div style={{fontSize: 20}}>{sectionId.name} <button onClick={() => deletedPosition(sectionId._id)}>удалить</button></div> 
                {sectionId.object.map((item, i )=> (
                  <ListItem key={`${i}-${sectionId._id}`}>
                    <ListItemText primary={item} /><button onClick={() => deletedObject(sectionId, i)} >удалить</button>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List> : "" }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({workshopsReducers}) => ({
    workshops: workshopsReducers.workshops
})
const mapDispatchToProps = dispatch => ({
  getAllWorkshops: (workshops) => dispatch(getAllWorkshops(workshops)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkShopsList)