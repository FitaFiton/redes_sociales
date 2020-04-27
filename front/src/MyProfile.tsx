import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './MyProfile_styles.css';
import axios from 'axios'
import Tabla from "./tabla";
import {Button, TextField} from "@material-ui/core";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Row, Container, Col } from 'react-bootstrap';

let config = {
    headers: {
        Authorization: `JWT ${localStorage.getItem('session')}`
    }
};


export class MyProfile extends Component {

    state = {
        posts: [],
        tf_title: '',
        tf_content: ''
    };

    componentDidMount(): void {
        console.log("hola");
        axios.get('http://127.0.0.1:8000/api/post/?filterByUser=1', config).then((response) => {
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

    // onDeletePost = (post_id: number) => {

    //     axios.delete('http://127.0.0.1:8000/api/post/' + post_id + '/', config).then(response => {
    //         console.log(response);

    //         if (response.status === 200) {
    //             const new_posts = this.state.posts.filter((post: any) => {
    //                 return post.id !== post_id;
    //             });

    //             this.setState({
    //                 posts: new_posts
    //             });
    //         }
    //     });
    // };

    render() {

        return(
            <div>
                <Container fluid="md">
                    <Row className= "separator">
                        <Col className="box-1 rounded-border">1 of 1</Col>
                    </Row>
                </Container>

                <Container fluid="md" className="rounded-border">
                    <Row xs={9} className= "separator "  >

                        <Col xs={9} className="box-4 rounded-border" md={{ offset: 4 }}>
                            <form  noValidate autoComplete="off">
                                <TextField id="tf_title" label="Title" variant="outlined" onChange={this.onChangeTextField}/>
                                <TextField id="tf_content" label="Content" variant="outlined" onChange={this.onChangeTextField}/>
                            </form>
                        </Col>
                        
                    </Row>
                    <Row className= "separator" >
                        <Col  md={{ offset: 10}}>
                            <Button variant="contained" color="primary" onClick={() => {
                                //Enviar los datos al servidor
                                //Recopilar los datos
                                //Peticion

                                axios.post('http://127.0.0.1:8000/api/post/', {
                                    title: this.state['tf_title'],
                                    content: this.state['tf_content'],
                                }, config).then(response => {
                                    console.log(response);
                                    this.setState({
                                        posts: [...this.state.posts, response.data],
                                        });
                                    });
                            }}>Publicar</Button>
                        </Col>
                        
                    </Row>
                </Container>

                

                <Container fluid="md">
            
                    <Row className="box-2-3" >
                        <Col className="box-2 rounded-border">1 of 3</Col>
                        <Col xs={9} className="box-3 rounded-border">2 of 3 (wider)</Col>
                    </Row>

                </Container>

            </div>
            
        );
    }
}