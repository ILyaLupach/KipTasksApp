import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95vw",
    },
  },
}));

export default function InputFailure({valueFailure, setValueFailure, valueFixed, setValueFixed}) {
  const classes = useStyles();


  const handleChangeFailure = event => {
    setValueFailure(event.target.value);
  };
  const _handleKeyDownFailure = (e) => {
    if (e.key === 'Enter') {
        setValueFailure(e.target.value)
    }
  }


  const handleChangeFixed = event => {
    setValueFixed(event.target.value);
  };
  const _handleKeyDownFixed = (e) => {
    if (e.key === 'Enter') {
        setValueFixed(e.target.value);
    }
  }

  return (
    <div className={classes.root} noValidate autoComplete="off">
        <TextField 
            id="standard-basic"
            label="Проблема" 
            value={valueFailure}
            onKeyDown={_handleKeyDownFailure}
            onChange={handleChangeFailure}/>

        <TextField
            id="standard-multiline-flexible"
            label="Решение"
            multiline
            rows="3"
            rowsMax="6"
            value={valueFixed}
            onKeyDown={_handleKeyDownFixed}
            onChange={handleChangeFixed}/>
    </div>
  );
}
