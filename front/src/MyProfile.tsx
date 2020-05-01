import React, {Component} from 'react';
import logo from './logo.svg';
import './MyProfile_styles.css';
import axios from 'axios'

import Tabla from "./tabla";
import PostCard from "./PostCardView"

import {TextField} from "@material-ui/core";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Row, Container, Col, Card, Accordion, Form,Button, Image} from 'react-bootstrap';

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

    onDeletePost = (post_id: number) => {

        axios.delete('http://127.0.0.1:8000/api/post/' + post_id + '/', config).then(response => {
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
            <div>
                <Container fluid="md">
                    <Row className= "separator">
                        <Col className="box-1 rounded-border">1 of 1</Col>
                    </Row>
                </Container>

                <Container fluid="md" className="rounded-border">
                    <Row >

                        <Col  className="profile-image-box rounded-border">
                            <Image className="image-exammple" src="holder.js/171x180" roundedCircle />
                        </Col>

                        <Col className="box-4 rounded-border" xs={9}>
                            <Form className="post-imput">
                                <Col md={{ offset: 9}} >
                                    <Form.Group  className="post-title-imput" controlId="postTitle"  >
                                        <Form.Control id="tf_title" className="post-imput-label" placeholder="Title"  onChange={this.onChangeTextField}/>
                                    </Form.Group>
                                </Col>
                                
                                <Form.Group controlId="postContent">
                                    <Form.Control id="tf_content" className="post-imput-label" placeholder="Content" onChange={this.onChangeTextField}/>
                                </Form.Group>

                                <Col md={{ span:12, offset: 9}} >
                                    <Button  variant="secondary" onClick={() => {
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

                            </Form>
                        </Col>
                        
                    </Row>

                    
                    <Row >
                        <Col md={{span: 9, offset: 3 }} className= "separator post-button-container">
                            <Col md={{ offset: 10}} >
                                <Button  variant="secondary" onClick={() => {
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
                        </Col>
                    </Row>
                </Container>

                

                <Container fluid="md">
            
                    <Row className="box-2-3" >
                        <Col className="box-2 rounded-border">1 of 3</Col>

                        <Col xs={9} className="box-3 rounded-border">

                            {/* <div className = "post-list-atributes">
                                <Tabla data={this.state.posts} on_click_delete={this.onDeletePost} number={1}> </Tabla>
                            </div> */}
                            
                                <PostCard  data={this.state.posts} on_click_delete={this.onDeletePost} number={1}></PostCard>
                            
               
                            
                        </Col>
                    </Row>

                </Container>

            </div>
            
        );
    }
}