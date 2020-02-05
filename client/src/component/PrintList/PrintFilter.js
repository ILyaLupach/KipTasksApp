import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Link } from 'react-router-dom';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex:99,
    backgroundColor: "#00a4d3",
  },
  popup: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}));


export default function PrintFilter({open, setOpen, searchWith, searchBy, setSearchWith, setSearchBy}) {


  const classes = useStyles();



  const handleChangeSearchWith = date => {
    setSearchWith(date);
  };
  const handleChangeSearchBy = date => {
    setSearchBy(date);
  };

  return (

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <DialogContent>
            <form className={classes.popup} noValidate autoComplete="off">

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">

      <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          format="dd/MM/yyyy"
          value={searchWith}
          onChange={handleChangeSearchWith}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          format="dd/MM/yyyy"
          value={searchBy}
          onChange={handleChangeSearchBy}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />


      </Grid>
    </MuiPickersUtilsProvider>
            </form>

        </DialogContent>
        <DialogActions>

        <Link to="/">
          <Button  onClick={() => setOpen(false)} color="primary">
            назад
          </Button>
        </Link>

          <Button  onClick={() => setOpen(false)} color="primary">
            OK
          </Button>

        </DialogActions>
      </Dialog>

  );
}



