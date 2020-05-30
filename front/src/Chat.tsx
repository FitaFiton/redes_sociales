import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import {ChatInput} from "./ChatInput";
import List from '@material-ui/core/List';
import axios from 'axios';
import './App.css';
import {Image, Row, Col} from 'react-bootstrap';
import './Chat_styles.css';
import Grid from '@material-ui/core/Grid';
type ChatProps = {

}

type ChatState = {
    messages: any[];
    users_followed: any[];
    info_actual_user_chat: {
            username: string,
            user_image: string,
            };
    actual_chat: any[];
    room_id: number;
}

export class Chat extends Component<ChatProps, ChatState>{

    ws: any = null;

    state = {
        messages: [],
        users_followed: [],
        info_actual_user_chat: {
            username: "",
            user_image: "",
        },
        actual_chat: [],
        room_id: 0
    };

    constructor(props: ChatProps) {
        super(props);

        //Encontrar la sala o crearla


    }


    componentDidMount(): void {

        var hostname = /backend/gi;
        axios.get('http://127.0.0.1/api/friend/?filterByUser=' + localStorage.getItem("user_id")).then((response: any) => {
            console.log(response);
            let user_friends: any[] = [];
            let friends_to_filter = response.data;


            for (var val of friends_to_filter){
                user_friends.push(val['friend_id']);
            }

            axios.get('http://127.0.0.1/api/user/').then((response) => {

                let users_follow: any[] = [];
                let users_to_filter = response.data;
                for (var val of users_to_filter){
                    if (user_friends.includes(val["id"])){
                        let image_url: string = val['profile']['image'];
                        val['profile']['image'] = image_url.replace(hostname, "127.0.0.1");
                        users_follow.push(val);
                    }
                }
                this.setState({
                        users_followed: users_follow
                });
            });
        });
    }

    setWebSocket(): void{
        this.ws.onopen = () => {
            console.log("Conectado al chat");
        };

        this.ws.onmessage = (event: any) => {
            console.log(event);
            const message_data = JSON.parse(event.data);
            let formData = new FormData();
            formData.append('text', message_data['text']);
            formData.append('username', message_data['username']);
            formData.append('date', message_data['date']);
            axios.put('http://127.0.0.1/api/chat/' + this.state.room_id + '/', formData).then( r => {
                console.log(r);

            });
            this.setState(state => ({messages: [...state.messages, message_data]}));
            console.log(this.state)
        };

        this.ws.onclose = () => {
            console.log("Desconectado");
        };
    }

    setActualUserChat = (username: string, image: string) => {
        console.log("click actual chat");
        if(this.ws != null){
            this.ws.close();
        }

        //console.log("reseteo");
        this.setState({
            info_actual_user_chat: {
                username: username,
                user_image: image,
        }});
        axios.get('http://127.0.0.1/api/chat/?filterByUsers=' + username).then((response: any) => {
            console.log(response);

            this.setState({
                actual_chat: response.data
            });

            if (response.data.length == 0){
                axios.get('http://127.0.0.1/api/chat/?filterByCount=1').then((response2: any) => {
                    console.log(response2);

                    if (response2.data.length == 0){
                        console.log("Entro mal");
                        this.setState({
                            room_id: 1
                        });
                    }
                    else{
                         this.setState({
                            room_id: response2.data[0].room_id + 1
                        });
                    }

                    axios.post('http://127.0.0.1/api/chat/', {
                        username: localStorage.getItem("username"),
                        friend_username: this.state.info_actual_user_chat.username }).then(response3 => {
                            console.log(response3)
                            this.ws = new WebSocket('ws://127.0.0.1/ws/chat/' + this.state.room_id + '/');
                            this.setWebSocket()
                        });

                });

                //
            }
            else{
                this.setState({
                    room_id: this.state.actual_chat[0]['room_id']
                });
                axios.get('http://127.0.0.1/api/chat/?filterByRoom=' + this.state.room_id).then(r => {
                    console.log(r)

                    this.setState({
                        messages: r.data[0].messages
                    });

                });
                this.ws = new WebSocket('ws://127.0.0.1/ws/chat/' + this.state.room_id + '/');
                this.setWebSocket()
            }
        });


    }


    sendMessage = (msg: string) => {
        console.log("Mandando mensanje: " + msg)
        this.ws.send(msg);
    }

    render() {
        return (

            <div>
                <Grid container  direction="row" spacing={3}>
                    <Grid direction="column" item xs={1} sm={2}>
                    </Grid>
                    <Grid direction="column" item xs={2} sm={2}>
                        <div className="main-container">
                            <div className="box-friend-list">
                            {this.state.users_followed.map((m: any, i: number) => {
                                    return (<div key={i} onClick={() => {
                                                                               this.setActualUserChat(m.username, m.profile.image);}}>
                                                <Row className="box-friends">
                                                    <Col className="box-friends-image">
                                                        <Image style={{ width: '4rem', height: '4rem'}} src={m.profile.image} roundedCircle />

                                                    </Col>
                                                    <Col className="box-friends-username">
                                                        <b>{m['username']}</b>
                                                    </Col>
                                                </Row>


                                            </div>);
                                    })
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid direction="column" item xs={8} sm={7}>
                        <div className="main-container-rooms">

                            {
                                (this.state.info_actual_user_chat.username!="") ?
                            <div>
                            <div>
                                <Row className="user-chat-header">
                                    <Col className="user-chat-image">
                                        <Image style={{ width: '4rem', height: '4rem'}} src={this.state.info_actual_user_chat.user_image} roundedCircle />

                                    </Col>
                                    <Col className="user-chat-username">
                                        <b>{this.state.info_actual_user_chat.username}</b>
                                    </Col>
                                </Row>
                             </div>
                             <div className="box-rooms">
                                {this.state.messages.map((m: any, i: number) => {
                                    return (<List className="box-list-messages" key={i}>
                                            {
                                                (localStorage.getItem("username")!=m['username']) ?
                                                <div>
                                                <b>{m['username']}</b>: {m['text']}
                                                <div>
                                                {m['date']}
                                                </div>
                                                </div>
                                                :
                                                <div className="box-chat-user-connected">
                                                    <b>{m['username']}</b>: {m['text']}
                                                    <div>
                                                    {m['date']}
                                                    </div>
                                                </div>
                                            }

                                            </List>);
                                    })
                                }
                                <div className="box-chat-input">
                                    <ChatInput onSendMessage={(msg: string) => this.sendMessage(msg)}/>
                                </div>
                            </div>
                            </div>: <div></div>
                            }


                        </div>
                    </Grid>
                    <Grid direction="column" item xs={1} sm={1}>
                    </Grid>
                </Grid>
            </div>

        );
    }

}

export default Chat;

