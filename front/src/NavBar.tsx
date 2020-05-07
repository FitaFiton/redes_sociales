import React, { Component } from 'react';
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";

import {Navbar,NavDropdown, Form, FormControl, Dropdown} from 'react-bootstrap'

import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import './NavBar_styles.css';

import axios from "axios";
import history from './history';

import DropdownButton from 'react-bootstrap/DropdownButton'

import SplitButton from 'react-bootstrap/SplitButton'


type NavBarProps = {
    logged_in: boolean;
}

type NavBarState = {
    logged_in: boolean;
}

export class NavBar extends Component <NavBarProps, NavBarState>{

    constructor(props: NavBarProps) {
        super(props);
        
    }

    componentDidMount(): void {
        console.log("EMPEZANDO NAVBAR");
        if (localStorage.getItem("session") !== null){
               this.setState({logged_in: true});
        }
        else{
            this.setState({logged_in: false});
        }
    }

    componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any): void {
        console.log("Componenwill")
    }

    logout = () => {
        console.log("LOGOUT");

        localStorage.removeItem('session');
        localStorage.removeItem('username');
        axios.defaults.headers.common['Authorization'] = '';

        axios.interceptors.request.use( config => {
            config.headers.Authorization = '';
            return config;
        });
        this.setState({logged_in: false});
        history.push('/login');
    };

    render(){
        let {logged_in} = this.props;

        return(
            <Navbar sticky="top" collapseOnSelect bg="light" expand="lg"  >
                <Navbar.Brand href="/home" >{logged_in ? 'Hola, ' + localStorage.getItem('username') : 'Anónimo'}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        {
                            logged_in ? 
                            <Navbar.Collapse id="responsive-navbar-nav" > 
                                <Nav className="navbar-box-1">
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <Nav.Link href="/">Posts</Nav.Link>
                        
                                    <Nav.Link href="/Chat/">Chat</Nav.Link>
                                </Nav>
                                <Nav className=" navbar-box-2">
                                    <SplitButton href="/myprofile" variant="secondary" alignRight title={<i className="far fa-user fa-sg icon-profile profile-dropdown"></i>} id="dropdown-menu-align-right">
                                        <NavDropdown.Item href="/">Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                        <NavDropdown.Item  onClick={() => this.logout()}>Log out</NavDropdown.Item>
                                    </SplitButton>
                                    <Nav.Link className="logout-icon" onClick={() => this.logout()}> <i className="fas fa-running fa-lg "></i> </Nav.Link>
                            
                                </Nav>
                            </Navbar.Collapse>
                            :
                            <Navbar.Collapse id="responsive-navbar-nav" > 
                                <Nav className="navbar-box-1">
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <Nav.Link href="/">About us</Nav.Link>
                                </Nav>
                                <Nav className=" navbar-box-2">
                                    <NavDropdown alignRight title={<i className="far fa-user fa-sg icon-profile-gray profile-dropdown"></i>} id="dropdown-menu-align-right">
                                    
                                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                    </NavDropdown>

                                </Nav>
                            </Navbar.Collapse>
                        }
            </Navbar>

    
        ); 
    }
    
};

export default NavBar;
