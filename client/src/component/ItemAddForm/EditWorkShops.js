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


function EditWorkShopsList({workshops, getAllWorkshops}) {

  const classes = useStyles();

  const serv = new ServerKip();

  const [open, setOpen] = React.useState(false);
  const [complited, setComplited] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [workShopsName, setWorkShopsName] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleAddWorkShop = () => {
    if(workShopsName.length > 3){
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
  }


  const handleChangeName = event => {
    setWorkShopsName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
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


  return (
    <>

      <span onClick={handleClickOpen}>:</span>


      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>

        {complited ? <Alert severity="success"> Новый элемент добавлен </Alert> :
          <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Название нового цеха"  onChange={handleChangeName}  />
        </form>
        }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddWorkShop} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({workshopsReducers}) => ({
    workshops: workshopsReducers
})
const mapDispatchToProps = dispatch => ({
  getAllWorkshops: (workshops) => dispatch(getAllWorkshops(workshops)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkShopsList)