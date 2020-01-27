import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import "./ItemAddForm.css";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

import InputWorkShop from "./InputWorkShop";
import InputDate from "./InputDate";
import InputName from "./InputName";
import InputFailure from "./InputFailure";





const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: "98vw",
    backgroundColor: "#00a5d3"
  },
}));

export default function ItemAddForm() {

  const classes = useStyles();


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ paddingTop: 60 }}>
        <Grid container justify="space-between">

          <InputDate />
          
        <span className="addtaskstittle"> Учавствующие работники </span>

          <InputName />

        <span className="addtaskstittle"> Цех и место поломки </span>

        <InputWorkShop />

        <span className="addtaskstittle"> Описание проблемы и решение </span>

        <InputFailure />

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />} >
            Save
        </Button>

        </Grid>
        </div>
      </MuiPickersUtilsProvider>
  );
}