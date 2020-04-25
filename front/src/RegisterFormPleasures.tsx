import React, {Component} from 'react';
import axios from "axios";
import { TextField, Container, Fab, FormControlLabel } from '@material-ui/core';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
//import {RegisterFormProps, RegisterFormState} from './RegisterForm'
import history from './history';

type RegisterFormPleasuresProps = {
    on_register: boolean;

}

type RegisterFormPleasuresState = {
    music: boolean;
    literature: boolean;
    sport: boolean;
    party: boolean;
    art: boolean;
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


    constructor(props: RegisterFormPleasuresProps) {
        super(props);
        this.state = {
            music: false,
            literature: false,
            sport: false,
            party: false,
            art: false,
        }

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
        axios.post('http://127.0.0.1:8000/api/profile/', this.state);
        history.push('');
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


    render() {
        let {on_register} = this.props;

        return (

            <div className="register-box-background-pleasures">
            <div className="register-box">Register
                <div className="register-pleasures-box">
                <form method="post" onSubmit={event => {this.onSubmit(event)}}>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.music} onChange={this.handleChange} name="music" />}
                                    label="music"
                        />
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.literature} onChange={this.handleChange} name="literature" />}
                                    label="literature"
                        />
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.sport} onChange={this.handleChange} name="sport" />}
                                    label="sport"
                        />
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.party} onChange={this.handleChange} name="party" />}
                                    label="party"
                        />
                    </div>
                    <div className="register-pleasures-checkbox">
                        <FormControlLabel
                                    control={<GreenCheckbox checked={this.state.art} onChange={this.handleChange} name="art" />}
                                    label="art"
                        />
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