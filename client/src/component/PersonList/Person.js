import React, { useState, useEffect } from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import {getAllTasks}  from "../../actions";
import PersonsItem from "./PersonsItem"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import AddNewPerson from './AddNewPerson';

import {getAllPersons}  from "../../actions";


function Persons ({persons, getAllPersons}) {

  const serv = new ServerKip();

  useEffect(() => {
    updatePersons()
  }, []);

  const updatePersons = () => {
    serv.getAllPersons()
      .then(res => {
        getAllPersons(res)
    }) 
  }

    const allPersons = persons.persons;

    return (
        <div className="personslist">
            {(
              !allPersons ? (<h2>Loading...</h2>) : 
              allPersons.map((item, i) => <PersonsItem 
                key={item._id}
                updatePersons={updatePersons} 
                deleteItem={serv.deleteItem} 
                panel={`panel${i}`} {...item}/>)
            )}
            <AddNewPerson updatePersons={updatePersons}/>
        </div>
    )
  }

const mapStateToProps = ({personsReducers}) => ({
  persons: personsReducers
})

const mapDispatchToProps = dispatch => ({
  getAllPersons: (persons) => dispatch(getAllPersons(persons))  
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
