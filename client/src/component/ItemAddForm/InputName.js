import 'date-fns';
import React from 'react';

import "./ItemAddForm.css";


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 320,
    },
  },
};



function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }




export default function ItemAddForm({personName, setPersonName, persons}) {
  const classes = useStyles();
  const theme = useTheme();

  const handlePersonChange = event => {
    setPersonName(event.target.value);
  };

  return (

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Выберите Работника</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handlePersonChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        > 
        { !persons ? (<h2>Loading...</h2>) : 
          persons.map(item => (
            <MenuItem key={item._id} value={`${item.surname} ${item.name}`} style={getStyles(item, personName, theme)}>
              {`${item.surname} ${item.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}