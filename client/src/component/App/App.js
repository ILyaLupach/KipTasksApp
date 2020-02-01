import React from 'react';
import '../../store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import store from '../../store'; 
import "./App.css";
import ItemAddForm from "../ItemAddForm/ItemAddForm";


import NavTabs from "../NavTabs/NavTabs";
import Persons from "../PersonList/Person";
import WorkShop from "../Tasks/Tasks";
   

export default class App extends React.Component {


    render() {

        return(
            <Provider store={store}>
                <Router>

                        <NavTabs />

                        <Route path="/" exact component={WorkShop} />
                        <Route path="/persons" exact component={Persons} />
                        <Route path="/addTasks" component={ItemAddForm} />

                </Router>
            </Provider>
        )
    }
}


