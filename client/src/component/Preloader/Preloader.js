import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 1,
    background: "#fff",
    color: '#00a5d3',
    opacity: 1
  },
}));

export default function Preloader({open}) {
  const classes = useStyles();
  return (
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}
