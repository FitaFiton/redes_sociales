import React, {Component} from 'react';
import './Home_styles.css';
import axios from 'axios'
import PostCard from "./PostCardView"
import {NewFriends} from "./NewFriends"
import {Rankings} from "./Rankings"
import Hidden from '@material-ui/core/Hidden';
import { Row, Container, Col, Card, Accordion, Form,Button, Image} from 'react-bootstrap';

let config = {
    headers: {
        Authorization: `JWT ${localStorage.getItem('session')}`
    }
};


export class Home extends Component {

    state = {
        posts: [],
        tf_title: '',
        tf_content: ''
    };

    componentDidMount(): void {
        console.log(localStorage.getItem("session"));
        axios.get('http://127.0.0.1/api/post/', config).then((response) => {
            console.log(response);
            let all_posts: any[] = [];
            let posts_filtered: any[] = [];
            all_posts = response.data;
            axios.get('http://127.0.0.1/api/friend/?filterByUser=' + localStorage.getItem("user_id")).then((response) => {
            console.log(response);
            let user_friends: any[] = [];
            let friends_to_filter = response.data;


            user_friends.push(Number(localStorage.getItem("user_id")));
            for (var val of friends_to_filter){
                user_friends.push(val['friend_id']);
            }
            console.log("AQUI LISTA AMIGOS")
            console.log(user_friends);
            for (val of all_posts){

                if (user_friends.includes(val['author']['id'])){

                    posts_filtered.push(val)
                }
            }
            this.setState({
                posts: posts_filtered,
                });
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

        axios.put('http://127.0.0.1/api/user/' + localStorage.getItem('user_id') + '/', {
                        posts_number: -1
                    }, config).then(response => {
                        console.log(response);
        });
    };

    render() {

        return(
            <div className="extend-width ">
                

                

                <Container className="main-container" >
            
                    <Row className="box-2-3" >
                        <Col xs lg="2" className="box-2 rounded-border">
                            <Rankings/>
                        </Col>

                        <Col xs className="box-3 rounded-border">

                            {/* <div className = "post-list-atributes">
                                <Tabla data={this.state.posts} on_click_delete={this.onDeletePost} number={1}> </Tabla>
                            </div> */}
                                <Form className="post-imput">
                                        <Form.Group  className="post-title-imput" controlId="postTitle"  >
                                            <Form.Control id="tf_title" className="post-imput-label"  placeholder="Title"  onChange={this.onChangeTextField}/>
                                        </Form.Group>
                                    
                                    <Form.Group controlId="postContent">
                                        <Form.Control id="tf_content" className="post-imput-label" placeholder="Content" onChange={this.onChangeTextField}/>
                                    </Form.Group>


                                        <div className="box-button-post">
                                        <Button  variant="secondary" onClick={() => {
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
                                            axios.put('http://127.0.0.1/api/user/' + localStorage.getItem('user_id') + '/', {
                                                    posts_number: 1
                                                }, config).then(response2 => {
                                                    console.log(response2);
                                                   });


                                        }}>Post</Button>
                                        </div>

                                    <PostCard data={this.state.posts} on_click_delete={this.onDeletePost} number={1}></PostCard>
                                </Form>
                                


               
                        </Col>
                        <Hidden smDown>
                            <Col lg="3" className="box-5 rounded-border">
                                <div>
                                    <NewFriends>
                                    </NewFriends>
                                </div>
                            </Col>
                         </Hidden>
                    </Row>

                </Container>

            </div>
            
        );
    }
}