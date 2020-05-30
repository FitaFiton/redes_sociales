import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './PostList_styles.css';
import axios from 'axios'
import Tabla from "./tabla";
import PostCard from "./PostCardView";
import {Button, TextField} from "@material-ui/core";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Container } from 'react-bootstrap';

let config = {
    headers: {
        Authorization: `JWT ${localStorage.getItem('session')}`
    }
};


export class PostList extends Component {

    state = {
        posts: [],
        tf_title: '',
        tf_content: ''
    };
    componentDidMount(): void {
        console.log("hola");
        axios.get('http://127.0.0.1/api/post/?filterByUser=1', config).then((response) => {
            console.log(response);
            this.setState({
                posts: response.data,
            });
        });
    }


    onChangeTextField = (event: any) => {
        let value = event.target.value;
        let id = event.target.id;

        this.setState({
            [id]: value,
        });
    };

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


    };

    render() {

        return(

            <Container className="post-list-box">
                <form >
                    <PostCard data={this.state.posts} on_click_delete={this.onDeletePost} number={1}></PostCard>
                </form>
                
                <form  noValidate autoComplete="off">
                    <TextField id="tf_title" label="Title" variant="outlined" onChange={this.onChangeTextField}/>
                    <TextField id="tf_content" label="Content" variant="outlined" onChange={this.onChangeTextField}/>
                </form>
                <Button variant="contained" color="primary" onClick={() => {
                    //Enviar los datos al servidor
                    //Recopilar los datos
                    //Peticion

                    axios.post('http://127.0.0.1/api/post/', {
                        title: this.state['tf_title'],
                        content: this.state['tf_content'],
                    }, config).then(response => {
                        console.log(response);
                        this.setState({
                            posts: [...this.state.posts, response.data],
                         });
                       });


                }}>Publicar</Button>
            </Container>
    );
    }
}

