import React, {Component} from 'react';
import axios from "axios";
import { TextField, Container, Fab, FormControlLabel, Button } from '@material-ui/core';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Route } from 'react-router-dom'
import RegisterFormPleasures from "./RegisterFormPleasures";
import { withRouter, Redirect  } from 'react-router-dom'
import history from './history';

type RegisterFormProps = {
    on_register: boolean;

}

type RegisterFormState = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {

    confirmPassword = ''
    constructor(props: RegisterFormProps) {
        super(props);
        this.state = {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
        }
        console.log(this.state);
        console.log("EMPIEZA REGISTER");

    }

    onChangeTextField = (event: any) => {
        let value = event.target.value;
        let name = event.target.name;

        if (name === 'username') {
            this.setState({
                username: value,
            });
        }
        else if(name === 'email'){
            this.setState({
                email: value,
            });
        }
        else if(name === 'first_name'){
            this.setState({
                first_name: value,
            });
        }
        else if(name === 'last_name'){
            this.setState({
                last_name: value,
            });
        }
        else if(name === 'password'){
            this.setState({
                password: value,
            });
        }
        else if(name === 'confirmPassword'){
            this.confirmPassword = value;
        }
    };

    onSubmit = (event: any) => {
        event.preventDefault();
        console.log(this.state);

        if (this.confirmPassword === this.state.password){
            axios.post('http://127.0.0.1/api/user/', this.state).then(r => {
            console.log(r);

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
                    history.push('/registerProfile');
                });

            });


        }
        //console.log("REGISTER");
        //history.push('/registerPleasures');
        //this.props.history.push('/register/pleasures');
        //this.render_pleasures();
        //fetch('http://127.0.0.1:8000/auth/', {
            //method: 'POST',
            //headers: {
                //'content-Typep': 'application/json',
            //},
            //body: JSON.stringify(data)
        //});
        //axios.post('http://127.0.0.1:8000/api/user/', this.state);
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
        if (event.target.name==="checkedG"){
            console.log(this.state)
        }
    };




    render() {

        return (
            <div className="register-box-background">
                <div className="register-box">Register
                <div className="register-box-options">
                <form method="post" onSubmit={event => {this.onSubmit(event)}}>

                      <div className="register-inputs" >
                        <TextField id="outlined-basic" name="username" label="Username" fullWidth variant="outlined" onChange={this.onChangeTextField}/>
                      </div>

                      <div className="register-inputs" >
                        <TextField id="outlined-basic" name="email" label="Email" fullWidth variant="outlined" onChange={this.onChangeTextField}/>
                      </div>

                      <div className="register-box-inputs-same-row">
                        <div className="register-inputs-middle-width">
                            <TextField id="outlined-basic" name="first_name" label="Name" fullWidth variant="outlined" onChange={this.onChangeTextField}/>
                        </div>
                        <div className="register-inputs-middle-width">
                            <TextField id="outlined-basic" name="last_name"label="Last name" fullWidth variant="outlined" onChange={this.onChangeTextField}/>
                        </div>
                      </div>

                      <div className="register-inputs">
                        <TextField id="outlined-basic" name="password" label="Password" fullWidth variant="outlined" onChange={this.onChangeTextField}/>
                      </div>

                      <div className="register-inputs">
                        <TextField id="outlined-basic" name="confirmPassword" label="Confirm password" fullWidth variant="outlined" onChange={this.onChangeTextField}/>
                      </div>


                      <div className="register-button">
                        <Fab type="submit" variant="extended" color="secondary" size="medium" aria-label="add">Continue</Fab>
                      </div>
                      <div className="register-description-text">We'll never share your email.</div>
                </form>
                </div>
                </div>
             </div>
        );

    }
}

export default RegisterForm;
