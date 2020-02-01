import 'date-fns';
import React, { useState, useEffect } from 'react';
import {connect} from "react-redux"
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import "./ItemAddForm.css";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';

import InputWorkShop from "./InputWorkShop";
import InputDate from "./InputDate";
import InputName from "./InputName";
import InputFailure from "./InputFailure";


import ServerKip from "../../services/services";
import {getAllPersons, getAllWorkshops}  from "../../actions";



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: "98vw",
    backgroundColor: "#00a5d3"
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    paddingTop: 200,
  },
}));



function ItemAddForm({getAllWorkshops, getAllPersons, persons, workshops}) {
  const serv = new ServerKip();
  const classes = useStyles();


//Лучше заменить всё одним объектом, но мне лень переделывать -->

  const [complited, setComplited] = useState(false);
  const [validate, setValidate] = useState(true);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(new Date());
  const [selectedFinish, setSelectedFinish] = useState(new Date());

  const [personName, setPersonName] = useState([]);

  const [selectedWorkshops, setSelectedWorkshops] = useState('');
  const [selectedObject, setselectedObject] = useState('');

  const [valueFailure, setValueFailure] = useState("");
  const [valueFixed, setValueFixed] = useState("");

  const allPersons = persons.persons;
  const allWorkshops = workshops.workshops;

  useEffect(() => {
    updateWorkshops();
    updatePersons();
  }, []);

  const updateWorkshops = () => {
    serv.getAllWorkshops()
      .then(res => {
        getAllWorkshops(res)
    }) 
  }

  const updatePersons = () => {
    serv.getAllPersons()
      .then(res => {
        getAllPersons(res)
    }) 
  }

  const postTask = () => {
    const body = {
      name: [...personName],
      date: selectedDate,
      start: selectedStart,
      finish: selectedFinish, 
      position: selectedWorkshops,
      object: selectedObject,
      failure: valueFailure,
      fix: valueFixed
  }

  if(allWorkshops.filter(item => item.name === body.position)[0].object.filter(item => item === body.object).length === 0) {

    const obj = allWorkshops.filter(item => item.name === body.position)[0].object;
    const newObj = [...obj, body.object];
    serv.updateData("workshops" , allWorkshops.filter(item => item.name === body.position)[0]._id, {object: newObj})
  }



  if( body.name !== [] && body.name.length !== 0 &&  body.position !== ''&&  body.object !== '' &&  body.failure !== '' &&  body.fix !== ''){

    if(allWorkshops.filter(item => item.name === body.position)[0].object.filter(item => item === body.object).length === 0) {

      const obj = allWorkshops.filter(item => item.name === body.position)[0].object;
      const newObj = [...obj, body.object];
      serv.updateData("workshops" , allWorkshops.filter(item => item.name === body.position)[0]._id, {object: newObj})
    }

    serv.taskPushTasks(body)
      .then(res => {
        if(res.ok) {
          setComplited(true);
          setPersonName([]);
          setSelectedWorkshops('');
          setselectedObject('');
          setValueFailure('');
          setValueFixed('');
          setTimeout(() => {
            setRedirect(true);
          }, 2000);
        } else {
          setError(true)
        }
      })
      .catch(err => {
        setError(true)
      })
    } else {
      setValidate(false);
      setTimeout(() => {
        setValidate(true);
      }, 2000);
    }
  }

  if(redirect){ 
    return <Redirect to="/" />
  };

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
  
  if(complited) {
    return(
      <div className={classes.root}>
      <Alert severity="success">
        Новый элемент добавлен в таблицу
      </Alert>
    </div>
      )
  }

  if(!validate){
    return (
      <div className={classes.root}>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Заполните все поля
      </Alert>
    </div>
    )
  }
  


  return (
   <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ paddingTop: 60 }}>
        <Grid container justify="space-between">

          <InputDate 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate} 
            selectedStart={selectedStart}  
            setSelectedStart={setSelectedStart}   
            selectedFinish={selectedFinish}     
            setSelectedFinish={setSelectedFinish} />
          
        <span className="addtaskstittle"> Участвующие работники </span>

        <InputName 
          persons={allPersons}
          personName={personName} 
          setPersonName={setPersonName} />

        <span className="addtaskstittle"> Цех и место поломки </span>

        <InputWorkShop 
          getAllWorkshops={getAllWorkshops}
          workshops={allWorkshops}
          selectedWorkshops={selectedWorkshops}
          setSelectedWorkshops={setSelectedWorkshops}
          selectedObject={selectedObject}
          setselectedObject={setselectedObject}/>

        <span className="addtaskstittle"> Описание проблемы и решение </span>

        <InputFailure 
          valueFailure={valueFailure}
          setValueFailure={setValueFailure}
          valueFixed={valueFixed}
          setValueFixed={setValueFixed}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=> postTask()}
          className={classes.button}
          startIcon={<SaveIcon />} >
            Сохранить
        </Button>

        </Grid>
        </div>
      </MuiPickersUtilsProvider>
  
  );
}
const mapStateToProps = ({workshopsReducers, personsReducers}) => ({
  workshops: workshopsReducers,
  persons: personsReducers,
})

const mapDispatchToProps = dispatch => ({
  getAllWorkshops: (workshops) => dispatch(getAllWorkshops(workshops)),
  getAllPersons: (persons) => dispatch(getAllPersons(persons)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm)