import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Button from '@material-ui/core/Button';




const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "45vw",
  }
}));

export default function InputWorkShop({selectedWorkshops, setSelectedWorkshops, setselectedObject, workshops}) {
  const classes = useStyles();

  const handleChangeWorkshops = event => {
    setSelectedWorkshops(event.target.value); 
  };

  const handleChangeObject = event => {
    setselectedObject(event.target.value); 
  };

  const _handleKeyDownObject = (e) => {
    if (e.key === 'Enter') {
      setselectedObject(e.target.value)
    }
  }



  return (
   <>
    { !workshops ? <h4>Loading</h4> :
    ( <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-customized-select-label">Цех</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selectedWorkshops}
          onChange={handleChangeWorkshops}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {workshops.map((item) => (<MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>)) }
          <MenuItem value="">
            <Button variant="contained" className="btn-addWorkShop"> Добавить цех </Button>
          </MenuItem>
        </Select>
      </FormControl>


      <FormControl className="inputobject">
          <Autocomplete
            id="combo-box-demo"
            debug
            onChange={handleChangeObject}
            onKeyDown={_handleKeyDownObject}
            onBlur={handleChangeObject}
            options={
            selectedWorkshops === '' ?  [] :
            workshops.filter((item) => item.name === selectedWorkshops)[0].object.map(str => str[0].toUpperCase() + str.slice(1)).sort() }
            getOptionLabel={ (option) => option}
            style={{
            width: "45vw"
              }}
                renderInput={params => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
          /> 
      </FormControl>
    </div>)}
   </>
  );
}

