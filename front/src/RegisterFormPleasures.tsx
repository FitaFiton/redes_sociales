import React, {Component} from 'react';
import axios from "axios";
import { TextField, Container, Fab, FormControlLabel } from '@material-ui/core';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
//import {RegisterFormProps, RegisterFormState} from './RegisterForm'
import history from './history';
import Form from 'react-bootstrap/Form'
import FormData from 'form-data'

let config = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
};

type RegisterFormPleasuresProps = {
    user_id: any;

}

type RegisterFormPleasuresState = {
    music: boolean;
    literature: boolean;
    sport: boolean;
    party: boolean;
    art: boolean;
    image: any;
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


class RegisterFormPleasures extends Component<RegisterFormPleasuresProps, RegisterFormPleasuresState> {

    private fileInput: React.RefObject<HTMLInputElement>
    constructor(props: RegisterFormPleasuresProps) {
        super(props);
        this.state = {
            music: false,
            literature: false,
            sport: false,
            party: false,
            art: false,
            image: null,
        }
        this.fileInput = React.createRef();
    }


    onSubmit = (event: any) => {
        event.preventDefault();
        console.log(this.state)
        console.log("PLEASURES");
        this.render();
        //fetch('http://127.0.0.1:8000/auth/', {
            //method: 'POST',
            //headers: {
                //'content-Typep': 'application/json',
            //},
            //body: JSON.stringify(data)
        //});

        let formData = new FormData();
        let {user_id} = this.props;
        console.log(localStorage.getItem("user_id"));
        if (this.state.music){
            formData.append('music', 1)
        }else{
            formData.append('music', 0)
        }
        if (this.state.literature){
            formData.append('literature', 1)
        }else{
            formData.append('literature', 0)
        }
        if (this.state.sport){
            formData.append('sport', 1)
        }else{
            formData.append('sport', 0)
        }
        if (this.state.party){
            formData.append('party', 1)
        }else{
            formData.append('party', 0)
        }
        if (this.state.art){
            formData.append('art', 1)
        }else{
            formData.append('art', 0)
        }
        formData.append('image', this.state.image)
        console.log(formData);
        console.log(user_id);
        axios.put('http://127.0.0.1/api/user/' + localStorage.getItem("user_id") + '/', formData, config).then( r => {
            console.log(r);
            history.push('/home');
            window.location.reload(false);
        });

    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.checked;
        let name = event.target.name;

        if (name === 'music') {
            this.setState({
                music: value,
            });
        }
        else if(name === 'literature'){
            this.setState({
                literature: value,
            });
        }
        else if(name === 'sport'){
            this.setState({
                sport: value,
            });
        }
        else if(name === 'party'){
            this.setState({
                party: value,
            });
        }
        else if(name === 'art'){
            this.setState({
                art: value,
            });
        }
    };


    fileSelectedHandler = (event: any) => {
        event.preventDefault();
        let file = event.target.files[0];
        console.log(file);
        if ( file !== null){
            this.setState({
                    image: file,
                });
        }
    }

    render() {

        return (

            <div className="register-box-background-pleasures">
            <div className="register-box">Register
            <Form>
            <Form.File
                id="custom-file"
                label={(this.state.image != null) ? this.state.image.name : "Escoja su foto de perfil"}
                onChange={this.fileSelectedHandler}
                custom
                />
            </Form>
                <div className="register-pleasures-box">
                <form method="post" onSubmit={event => {this.onSubmit(event)}}>
                    Escoja sus gustos
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.music} onChange={this.handleChange} name="music" />}
                                    label=""
                        />
                        <i className="fas fa-music element-separator"></i>
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.literature} onChange={this.handleChange} name="literature" />}
                                    label=""
                        />
                        <i className="fas fa-book element-separator"></i>
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.sport} onChange={this.handleChange} name="sport" />}
                                    label=""
                        />
                        <i className="fas fa-futbol element-separator"></i>
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.party} onChange={this.handleChange} name="party" />}
                                    label=""
                        />
                        <i className="fas fa-glass-cheers element-separator"></i>
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.art} onChange={this.handleChange} name="art" />}
                                    label=""
                        />
                        <i className="fas fa-palette"></i>
                    </div>
                    <div className="register-button">
                        <Fab type="submit" variant="extended" color="secondary" size="medium" aria-label="add">Continue</Fab>

                    </div>
                    </form>
                </div>

            </div>
            </div>
        );

    }
}

export default RegisterFormPleasures;