import React, {Component} from 'react';
import axios from 'axios';
import './MyProfile_styles.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PostCard from "./PostCardView"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Image, Row} from 'react-bootstrap';
import history from './history';
let config = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
};



export class Profile extends Component {

    state = {
        user: {
            id: 0,
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            creation_date: "",
            profile: {
                music: false,
                literature: false,
                sport: false,
                party: false,
                art: false,
                image: "",
            },
            posts_number: 0,
            followers: 0,
        },
        posts: [],
        friend: false,
        friendship: [],
    };

    constructor(props: any) {
        super(props);
        console.log("id del usuario a buscar");
        console.log(localStorage.getItem('last_profile_id_clicked'));
        axios.get('http://127.0.0.1/api/user/' + localStorage.getItem('last_profile_id_clicked') + '/', config).then((response) => {
            console.log(response);
            response.data.profile.image = 'http://127.0.0.1' + response.data.profile.image
            this.setState({
                user: response.data,
            });
            console.log("USER")

            axios.get('http://127.0.0.1/api/post/?filterByProfile=' + this.state.user.id).then((response) => {
                console.log(response);

                this.setState({
                    posts: response.data,
                });
                console.log(this.state.posts);
            });

            axios.get('http://127.0.0.1/api/friend/?filterByFriend=' + this.state.user.id).then((response) =>{
            console.log(response);

            if(response.data[0]){
                this.setState({
                    friendship: response.data,
                    friend: true,
                });
            }
            
            console.log(this.state.friendship);
        });

        });

        
    }

    componentDidMount(): void {

    }

    onDeletePost = (post_id: number) => {

        axios.delete('http://127.0.0.1/api/post/' + post_id + '/', config).then(response => {
            console.log(response);

            if (response.status === 200) {
                const new_posts = this.state.posts.filter((post: any) => {
                    return post.id !== post_id;
                });

                this.setState({
                    posts: new_posts
                });
            }
        });

        axios.put('http://127.0.0.1/api/user/' + localStorage.getItem('user_id') + '/', {
                        posts_number: -1
                    }).then(response => {
                        console.log(response);
        });
    };

    onFollow(): void{

        axios.post('http://127.0.0.1/api/friend/', {
                        user_id: localStorage.getItem("user_id"),
                        friend_id: this.state.user.id,
                    }).then(response => {
                        console.log(response);

                        axios.get('http://127.0.0.1/api/friend/?filterByFriend=' + this.state.user.id).then((response) =>{
                            console.log(response);

                            if(response.data[0]){
                                this.setState({
                                    friendship: response.data,
                                    friend: true,
                                });
                            }
                       });
                    
        });
        axios.put('http://127.0.0.1/api/user/' + this.state.user.id + '/', {
                        followers: 1
                    }).then(response => {
                        console.log(response);
        });
    }

    onUnfollow (): void{
        axios.delete('http://127.0.0.1/api/friend/' + this.state.friendship[0]['id'] + '/', config).then(response => {
            console.log(response);

            if (response.status === 200) {
                this.setState({
                    friendship: [],
                    friend: false
                });
            }
        });
        
        axios.put('http://127.0.0.1/api/user/' + this.state.user.id + '/', {
                        followers: -1
                    }).then(response => {
                        console.log(response);
        });
    }

    render() {


        return(
            <div >

                <Grid container  direction="row" spacing={3}>
                    <Grid direction="column" item xs={1} sm={2}>
                    </Grid>
                    <Grid direction="column" item xs={10} sm={8}>
                        <Grid direction="row" item xs={12} sm={12}>
                            <div className="header-profile-box">
                                <div className="text-username">
                                    <b>{this.state.user.username}</b>
                                </div>
                            </div>
                        </Grid>
                        <Grid direction="row" item xs={12} sm={12}>
                            <div className="grid-info">
                                <Grid item xs={12} sm={4}>
                                    <div className="image-profile-box">
                                        <Image style={{ width: '10rem', height: '10rem'}} src={this.state.user.profile.image} roundedCircle />
                                        <div className="user-icons">
                                            <Row xs={9} md={15}>
                                                {
                                                    this.state.user.profile.music ?
                                                    <i className="fas fa-music element-separator"></i> : <i></i>
                                                }
                                                {
                                                    this.state.user.profile.literature ?
                                                    <i className="fas fa-book element-separator"></i> : <i></i>
                                                }
                                                {
                                                    this.state.user.profile.sport ?
                                                    <i className="fas fa-futbol element-separator"></i> : <i></i>
                                                }
                                                {
                                                    this.state.user.profile.party ?
                                                    <i className="fas fa-glass-cheers element-separator"></i> : <i></i>
                                                }
                                                {
                                                    this.state.user.profile.art ?
                                                    <i className="fas fa-palette"></i> : <i></i>
                                                }
                                            </Row>
                                        </div>
                                        <div className="follow-button-container">
                                        {   
                                            (String(this.state.user.id)!=localStorage.getItem("user_id")) ?
                                            
                                                (this.state.friend) ?
                                                <Button  variant="contained" color="secondary"
                                                onClick={() => { this.onUnfollow()}}
                                                >Unfollow</Button> 
                                                    :
                                                <Button  variant="contained" color="primary"
                                                onClick={() => { this.onFollow()}}
                                                >Follow</Button> 
                                            :
                                            <Button  variant="contained" color="default"
                                                onClick={() => { history.push('/registerProfile');}}
                                                >Edit Profile</Button>
                                            
                                        }
                                            
                                        </div>
                                        <div className="info-profile-box">
                                            <br></br>
                                            <div className="text-titles">
                                                Name:
                                            </div>
                                            <div className="text-descriptions">
                                                {this.state.user.first_name}<br></br>
                                            </div>
                                            <br></br>
                                            <div className="text-titles">
                                                Last Name:
                                            </div>
                                            <div className="text-descriptions">
                                                {this.state.user.last_name}<br></br>
                                            </div>
                                            <br></br>
                                            <div className="text-titles">
                                                Email:
                                            </div>
                                            <div className="text-descriptions">
                                                {this.state.user.email}<br></br>
                                            </div>
                                            <br></br>
                                            <div className="text-titles">
                                                Register year:
                                            </div>
                                            <div className="text-descriptions">
                                                {this.state.user.creation_date.substr(0,4)}<br></br>
                                            </div>
                                            <br></br>
                                            <div className="text-titles">
                                                Followers:
                                            </div>
                                            <div className="text-descriptions">
                                                {this.state.user.followers}<br></br>
                                            </div>
                                            <br></br>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={8}>
                                    <div className="profile-posts-view">
                                        <PostCard data={this.state.posts} on_click_delete={this.onDeletePost} number={1}></PostCard>
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid direction="column" item  xs={1} sm={2}>
                    </Grid>
                </Grid>
            </div>);
    }
}
