import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import {ChatInput} from "./ChatInput";
import './App.css';

export class Chat extends Component{

    ws = new WebSocket('ws://127.0.0.1:8000/ws/chat/');

    componentDidMount(): void {
        this.ws.onopen = () => {
            console.log("Conectado al chat");
        };

        this.ws.onmessage = (event: any) => {
            console.log(event);
            const message_data = JSON.parse(event.data);
        };

        this.ws.onclose = () => {
            console.log("Desconectado");
        };

    }


    sendMessage = (msg: string) => {
        this.ws.send(msg);
    }

    render() {
        return (
            <div>
                Chat
                <ChatInput onSendMessage={(msg: string) => this.sendMessage(msg)}/>
            </div>
        );
    }

}

export default Chat;

