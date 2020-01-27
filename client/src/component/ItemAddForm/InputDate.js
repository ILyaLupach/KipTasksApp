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




export default function InputDate() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
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
              mode='24h'
              onChange={handleDateChange}/>
            <TimeInput
              mode='24h'
              value={selectedDate}
              onChange={handleDateChange}
            />
        </div>

      </Grid>
    </MuiPickersUtilsProvider>
  );
}