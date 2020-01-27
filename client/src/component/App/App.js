import React from 'react';
import '../../store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import store from '../../store'; 
import "./App.css";
import ItemAddForm from "../ItemAddForm/ItemAddForm";


import NavTabs from "../NavTabs/NavTabs";
import Person from "../PersonList/Person";
import Statistics from "../StatisticsList/Statistics";
import WorkShop from "../Tasks/Tasks";
   

export default class App extends React.Component {


    render() {

        return(
            <Provider store={store}>
                <Router>

                        <NavTabs />

                        <Route path="/" exact component={WorkShop} />
                        <Route path="/person" component={Person} />
                        <Route path="/statistics" component={Statistics} />

                        <Route path="/addTasks" component={ItemAddForm} />

                </Router>
            </Provider>
        )
    }
}

