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
import { Home } from './Home';
import {Profile} from "./Profile"
import {FriendsList} from "./FriendsList"

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
        console.log("Inicio App")

        return(

            <BrowserRouter >
            <Router history={history} >
                <NavBar logged_in={localStorage.getItem("session") !== null}/>
                <Switch>
                    <Route path="/registerProfile" id_user={localStorage.getItem("user_id")} component={RegisterFormPleasures}/>

                    <Route path="/register" on_register={true} component={RegisterForm}/>
                    <Route path="/login" component={LoginForm}/>

                    <Route path="/myprofile" component={MyProfile}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/home" component={Home}/>
                    {
                        (localStorage.getItem("user_id")!=null) ?
                        <Route path="/" component={FriendsList}/>
                        :
                        <Route path="/" component={LoginForm}/>
                    }
                </Switch>
             </Router>
            </BrowserRouter>
            );
    }
}

export default App;
