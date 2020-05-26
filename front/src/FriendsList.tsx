import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './FriendsList_styles.css';
import axios from 'axios'
import {Button, TextField} from "@material-ui/core";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Container } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import FriendsCard from "./FriendsCard"

let config = {
    headers: {
        Authorization: `JWT ${localStorage.getItem('session')}`
    }
};


export class FriendsList extends Component {

    state = {
        users_followed: [],
        aux_data: [],
        followers: []
    };
    componentDidMount(): void {
        console.log("hola");
        axios.get('http://127.0.0.1:8000/api/friend/?filterByUser=' + localStorage.getItem("user_id")).then((response) => {
            console.log(response);
            let user_friends: any[] = [];
            let friends_to_filter = response.data;


            for (var val of friends_to_filter){
                user_friends.push(val['friend_id']);
            }

            axios.get('http://127.0.0.1:8000/api/user/').then((response) => {

                let users_follow: any[] = [];
                let users_to_filter = response.data;
                for (var val of users_to_filter){
                    if (user_friends.includes(val["id"])){
                        users_follow.push(val);
                    }
                }
                this.setState({
                        users_followed: users_follow
                });
                });
        });
        axios.get('http://127.0.0.1:8000/api/friend/?filterByFollowers=' + localStorage.getItem("user_id")).then((response) => {
            console.log(response);
            let followers: any[] = [];
            let followers_to_filter = response.data;


            for (var val of followers_to_filter){
                followers.push(val['user_id']);
            }
            axios.get('http://127.0.0.1:8000/api/user/').then((response) => {
                let users_following: any[] = [];
                let users_to_filter = response.data;
                for (var val of users_to_filter){
                    if (followers.includes(val["id"])){
                        users_following.push(val);
                    }
                }
                this.setState({
                        followers: users_following
                });
            });
        });
    }



    render() {

        return(
            <div>

                <Grid container  direction="row" spacing={3}>
                    <Grid direction="column" item xs={1} sm={2}>
                    </Grid>
                    <Grid direction="column" item xs={5} sm={4}>
                        <div className="main-container">
                            <div className="box-Followers">
                                <b>FOLLOWERS</b>
                                <FriendsCard data={this.state.followers} aux_data={this.state.users_followed}></FriendsCard>

                            </div>
                        </div>
                    </Grid>
                    <Grid direction="column" item xs={5} sm={4}>
                        <div className="main-container">
                            <div className="box-Followed">
                                <b>FOLLOWED</b>
                                <FriendsCard data={this.state.users_followed} aux_data={this.state.aux_data}></FriendsCard>
                            </div>
                        </div>
                    </Grid>
                    <Grid direction="column" item xs={1} sm={2}>
                    </Grid>
                </Grid>
            </div>

    );
    }
}
