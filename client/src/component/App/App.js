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
import PrintList from "../PrintList/PrintList" ;  


export default class App extends React.Component {


    render() {

        return(
            <Provider store={store}>
                <Router>
                        <NavTabs />

                        <Route path="/" exact component={WorkShop} />
                        <Route path="/personlist" exact component={Persons} />
                        <Route path="/addTasks" component={ItemAddForm} />
                        <Route path="/printlist" component={PrintList} />

                </Router>



                <div className="backgroundPage"></div>
            </Provider>
        )
    }
}


