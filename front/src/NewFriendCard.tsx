import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'
import './NewFriendCard_styles.css';
import {Route, Switch} from "react-router-dom";
import {Card, Image, Col, Row} from 'react-bootstrap';
import history from './history';

const NewFriendContent = (props: any) => {
    let { newFriends } = props;
    console.log(newFriends);
    newFriends = newFriends.map((newFriend: any, i: number) => {
        return (
            <Card style={{ width: '15rem' }} key={newFriend.id} className="post-card-box">
                <Card.Body className="text-right" key={newFriend.id}>
                    <Card.Title ><Button  onClick={() => {
                                            //Enviar los datos al servidor
                                            //Recopilar los datos
                                            //Peticion

                                            localStorage.setItem('last_profile_id_clicked', newFriend.id);
                                            console.log(localStorage.getItem('last_profile_id_clicked'));
                                            history.push('/profile');
                                        }}><b>{newFriend.username}</b></Button>
                    </Card.Title>

                    <Col xs={6} md={4}>
                    {
                        newFriend.profile ?
                            <div>
                                <div className="newFriend-image">
                                    <Image style={{ width: '5rem', height: '5rem'}} src={newFriend.profile.image} roundedCircle />
                                </div>
                            <div className="newFriend-icons">
                            <Row xs={9} md={15}>
                            {
                                newFriend.profile.music ?
                                <i className="fas fa-music element-separator"></i> : <i></i>
                            }
                            {
                                newFriend.profile.literature ?
                                <i className="fas fa-book element-separator"></i> : <i></i>
                            }
                            {
                                newFriend.profile.sport ?
                                <i className="fas fa-futbol element-separator"></i> : <i></i>
                            }
                            {
                                newFriend.profile.party ?
                                <i className="fas fa-glass-cheers element-separator"></i> : <i></i>
                            }
                            {
                                newFriend.profile.art ?
                                <i className="fas fa-palette"></i> : <i></i>
                            }
                            </Row>
                            </div>
                            </div>
                            :
                            <div className="newFriend-image">
                                <Image style={{ width: '5rem'}} src="http://127.0.0.1:8000/media/static/descarga.png" roundedCircle />
                            </div>
                    }
                    <div className="add-button">
                        <Button variant="contained" color="primary" onClick={() => {
                    //Enviar los datos al servidor
                    //Recopilar los datos
                    //Peticion

                    axios.post('http://127.0.0.1/api/friend/', {
                        user_id: localStorage.getItem("user_id"),
                        friend_id: newFriend.id,
                    }).then(response => {
                        console.log(response);
                       });

                    axios.put('http://127.0.0.1/api/user/'+ newFriend.id + '/', {
                        followers: 1
                    }).then(response => {
                        console.log(response);
                       });
                }}>ADD</Button>
                    </div>
                    </Col>


                </Card.Body>
            </Card>
        );
    });

    return (
        <TableBody>
            {newFriends}
        </TableBody>
    );
};

const NewFriendCard = (props :any) => {
    const { data } = props;


    console.log(data);

    return (
        <NewFriendContent  newFriends={data}/>
    );
};

export default NewFriendCard;