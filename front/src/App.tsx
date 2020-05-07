import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Tabla from "./tabla";
import {Button, TextField} from "@material-ui/core";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RegisterFormPleasures from "./RegisterFormPleasures";
import {BrowserRouter, Router, Route, Switch, useHistory} from "react-router-dom";
import {PostList} from "./PostList";
import {Chat} from "./Chat"
import history from './history';
import { MyProfile } from './MyProfile';

class App extends Component {

    componentDidMount(): void {
        if (localStorage.getItem("session") !== null) {
            axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem("session")}`;
        }
        axios.defaults.xsrfCookieName= 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-csrftoken';


    }


    onClickRegistration = (event: any) => {
        //event.preventDefault();
        console.log(event);
        console.log("REGISTER");
    };

    render() {

        return(

            <BrowserRouter >
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <Route path="/registerProfile" id_user={localStorage.getItem("user_id")} component={RegisterFormPleasures}/>

                    <Route path="/register" on_register={true} component={RegisterForm}/>
                    <Route path="/login" component={LoginForm}/>

                    <Route path="/myprofile" component={MyProfile}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/" component={PostList}/>
                </Switch>
             </Router>
            </BrowserRouter>
            );
    }
}

export default App;
