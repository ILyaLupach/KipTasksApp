import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocationSearchingSharpIcon from '@material-ui/icons/LocationSearchingSharp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import "./NavTabs.css";
import ServerKip from "../../services/services";
import { Redirect } from 'react-router-dom';

import {setFilter, setSearchQuery, getAllWorkshops, getAllTasks} from "../../actions/index";



import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import sortBy from "../../secondaryFunctions/sortBy";










function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex:20,
    backgroundColor: "#00a4d3",
  },
  popup: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}));


function ScrollableTabsButtonPrevent({searchQuery, filterBy, tasks, setFilter, setSearchQuery, workshops, getAllWorkshops, getAllTasks}) {

  const serv = new ServerKip();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = useState(false);

  const allTasks = tasks;

/*   useEffect(() => {
    updateWorkshops();
    setSearchQuery('');
    setFilter("Все");
  }, []);
 */

  const updateWorkshops = () => {
    serv.getAllWorkshops()
      .then(res => {
        getAllWorkshops(res)
    }) 
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
    updateWorkshops();
    setSearchQuery('');
    setValue(0);
    updateWorkshops()
  };

  const handleClickOk = (tasks) => {
    setOpen(false);
    setValue(0);
  };


  const resetFilter = () => {
    setValue(0);
    setSearchQuery('');
    setFilter("Все");
    setOpen(false);
    setRedirect(true);
  }


  return (

      <AppBar className={classes.root} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<Link to="/">  <MenuBookIcon style={{ fontSize: 40 }} /></Link>} aria-label="workshop" />
          <Tab icon={<Link to="/persons"><AccountBoxIcon style={{ fontSize: 40 }} /></Link>} aria-label="person" />
          <Tab icon={<Link to="/"><LocationSearchingSharpIcon onClick={handleClickOpen} style={{ fontSize: 40, paddingTop: 2 }}/></Link>} aria-label="workshop" />
        </Tabs>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={resetFilter}>
        <DialogContent>
            <form className={classes.popup} noValidate autoComplete="off">

              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="gender" name="gender1" value={filterBy} onChange={event => setFilter(event.target.value) }>
                  <FormControlLabel value="Все" control={<Radio />} label="Все" />
                  {
                    !workshops.workshops ? <h4>Загрузка</h4> : (
                      workshops.workshops.map(item => <FormControlLabel key={item._id} 
                        value={item.name} control={<Radio color="primary"/>} label={item.name} />)
                    )
                  }
                </RadioGroup>
              </FormControl>


              <TextField value={searchQuery} onChange={event =>  setSearchQuery(event.target.value)}  id="name" label="Поиск по символам" />

            </form>

        </DialogContent>
        <DialogActions>


          <Button  onClick={resetFilter} color="primary">
            Сбросить
          </Button>

          <Button  onClick={handleClickOk} color="primary">
            Найдено: {allTasks && sortBy(allTasks, filterBy, searchQuery).length}
          </Button>

        </DialogActions>
      </Dialog>
            {redirect ? <Redirect to="/" /> : ""}
      </AppBar>

  );
}







const mapStateToProps = ({filterReducers, workshopsReducers, tasksReducer}) => ({
  filterBy: filterReducers.filterBy,
  searchQuery: filterReducers.searchQuery,
  workshops: workshopsReducers,
  tasks: tasksReducer.tasks
})

const mapDispatchToProps = dispatch => ({
  setFilter: (activeItem) => dispatch(setFilter(activeItem)),
  setSearchQuery: (value) => dispatch(setSearchQuery(value)),
  getAllWorkshops: (workshops) => dispatch(getAllWorkshops(workshops)),
  getAllTasks:  (tasks) => dispatch(getAllTasks(tasks))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTabsButtonPrevent);