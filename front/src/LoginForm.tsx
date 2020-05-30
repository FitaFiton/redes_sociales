import React, {Component} from 'react';
import axios from "axios";
import './LoginForm_styles.css';
import history from './history';

type LoginFormProps = {
    on_login: any;
    history: any;
}

type LoginFormState = {
    username: string;
    password: string;
}




class LoginForm extends Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeTextField = (event: any) => {
        let value = event.target.value;
        let name = event.target.name;

        if (name === 'username') {
            this.setState({
                username: value,
            });
        }
        else if(name === 'password'){
                this.setState({
                    password: value,
                });
        }
    };

    onSubmit = (event: any) => {
        console.log(this.state)
        event.preventDefault();
        console.log("LOGIN");
        console.log("hola");
        axios.post('http://127.0.0.1/auth/', this.state).then(r => {
            console.log(r);

            localStorage.setItem('session', r.data.token);
            localStorage.setItem('user_id', r.data.user.id);
            localStorage.setItem('username', r.data.user.username);
            axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem("session")}`;

            axios.interceptors.request.use( config => {
                config.headers.Authorization = `JWT ${r.data.token}`;
                return config;
            });
            history.push('/home');
            window.location.reload(false);
        });
    };


render() {
        let {on_login} = this.props;

        return (
            <div className="login-box-background">
                
                <div className="login-box">
                    <h1 className="login-title">Login</h1>
                    <form method="post" onSubmit={event => {this.onSubmit(event)}}>

                        <div className="login-textbox">
                            <i className="far fa-user"></i>
                            <input type="text" name="username" placeholder="username" onChange={this.onChangeTextField}/>
                        </div>

                        <div className="login-textbox">
                            <i className="fas fa-lock"></i>
                            <input type="text" name="password" placeholder="password" onChange={this.onChangeTextField}/>
                        </div>
                        <div className="login-box-button">
                            <input className="login-button" type="submit"/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
