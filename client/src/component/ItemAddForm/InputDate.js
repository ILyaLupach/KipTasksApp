import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import TimeInput from 'material-ui-time-picker'
import "./ItemAddForm.css";




export default function InputDate({selectedDate, setSelectedDate, selectedStart, setSelectedStart, selectedFinish, setSelectedFinish}) {

  const handleDateChange = date => {
    setSelectedDate(date); 
  };
  const handleStartChange = date => {
    setSelectedStart(date); 
  };  
  const handleFinishChange = date => {
    setSelectedFinish(date); 
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <span className="addtaskstittle">
          Время начала и завершения вызова
        </span>


        <div className="timeinputtitle">
            <TimeInput
              style={{ maxWidth: "33vw", margin: 5 }}
              mode='24h'
              value={selectedStart}
              onChange={handleStartChange}/>
            <TimeInput
              style={{ maxWidth: "33vw", margin: 5 }}
              mode='24h'
              value={selectedFinish}
              onChange={handleFinishChange}
            />
        </div>

      </Grid>
    </MuiPickersUtilsProvider>
  );
}