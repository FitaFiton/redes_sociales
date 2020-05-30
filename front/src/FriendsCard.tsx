import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'
import './NewFriendCard_styles.css';
import {Route, Switch} from "react-router-dom";
import {Card, Image, Col, Row} from 'react-bootstrap';
import history from './history';

const FriendsContent = (props: any) => {
    let { users, aux_data } = props;
    console.log("AUX_dATA")
    console.log(aux_data);
    users = users.map((user: any, i: number) => {
        console.log(user);
        let user_friend_check: any = aux_data.filter(
                function are_friends(element: any, index: number, array: any) {
                    return (element.id == user.id);
                }
        );
        console.log("SON AMIGOS?");
        console.log(user_friend_check);
        return (
            <Card style={{ width: '15rem' }} key={user.id} className="post-card-box">
                <Card.Body  key={user.id}>
                    <Card.Title >
                        <div className="friend-title">
                                        <Button  onClick={() => {
                                            //Enviar los datos al servidor
                                            //Recopilar los datos
                                            //Peticion

                                            localStorage.setItem('last_profile_id_clicked', user.id);
                                            console.log(localStorage.getItem('last_profile_id_clicked'));
                                            history.push('/profile');
                                        }}><b>{user.username}</b></Button>
                                        <div className="friend-title-icon">
                                        {
                                            (user_friend_check[0]) ?
                                            <i className="fas fa-user-check"></i> : <i></i>
                                        }
                                        </div>
                        </div>
                    </Card.Title>

                    <Col xs={6} md={4}>
                    {
                        user.profile ?
                            <div>
                                 <div className="newFriend-image">
                                        <Image style={{ width: '5rem', height: '5rem'}} src={user.profile.image} roundedCircle />
                                 </div>
                            </div>
                            :
                            <div className="newFriend-image">
                                <Image style={{ width: '5rem'}} src="http://127.0.0.1/media/static/descarga.png" roundedCircle />
                            </div>
                    }

                    </Col>
                </Card.Body>
            </Card>
        );
    });

    return (
        <TableBody>
            {users}
        </TableBody>
    );
};

const FriendsCard = (props :any) => {
    const { data, aux_data } = props;


    console.log(aux_data);

    return (
        <FriendsContent  users={data} aux_data={aux_data}/>
    );
};

export default FriendsCard;