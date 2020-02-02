import React, { useEffect } from 'react';
import {connect} from "react-redux"
import ServerKip from "../../services/services";
import PersonsItem from "./PersonsItem"

import AddNewPerson from './AddNewPerson';

import {getAllPersons}  from "../../actions";


class Persons extends React.Component {

  serv = new ServerKip();
/* 
  useEffect(() => {
    updatePersons()
  }, []);
     */

  componentDidMount() {
    this.updatePersons()
  }
     
  updatePersons = () => {
    this.serv.getAllPersons()
      .then(res => {
        this.props.getAllPersons(res)
    }) 
  }



render () {

  const allPersons = this.props.persons.persons;

    return (
          <div className="personslist">
              {(
                !allPersons ? (<h2>Loading...</h2>) : 
                allPersons.map((item, i) => <PersonsItem 
                  key={item._id}
                  updatePersons={this.updatePersons} 
                  deleteItem={this.serv.deleteItem} 
                  panel={`panel${i}`} {...item}/>)
              )}
              <AddNewPerson updatePersons={this.updatePersons}/>
          </div>
      )
    }
  }

const mapStateToProps = ({personsReducers}) => ({
  persons: personsReducers
})

const mapDispatchToProps = dispatch => ({
  getAllPersons: (persons) => dispatch(getAllPersons(persons))  
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
