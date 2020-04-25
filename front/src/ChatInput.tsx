import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import './App.css';

type ChatInputProps = {
    onSendMessage: any;
};

type ChatInputState = {
    message: string;
};


export class ChatInput extends Component<ChatInputProps, ChatInputState>{

    state = {message: ''};

    componentDidMount(): void {


    }

    render() {
        return (
            <div>
                <form onSubmit={ e => {
                    e.preventDefault();
                    this.props.onSendMessage(this.state.message);
                    this.setState({message: ''});
                }}>
                    <input
                        type="text"
                        placeholder="Introduce mensaje..."
                        value={this.state.message}
                        onChange={e => this.setState({message: e.target.value})}
                    />
                    <input type="Submit" value="Enviar"/>
                </form>
            </div>
        );
    }

}export default ChatInput;
