import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'

import {Card, Accordion} from 'react-bootstrap';

import './MyProfile_styles.css';



const THead = (props: any) => {

    return (
        <TableHead>
            <TableRow>
                <TableCell>Titulo</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Borrar</TableCell>
            </TableRow>
        </TableHead>
    );

};

{/* <Accordion className="post-list-accordion">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>Contenido post 1</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Titulo post 2
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>Contenido post 2</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion> 
*/}

{/* <Accordion className="post-list-accordion">
        <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.content}</TableCell>
            <TableCell>{post.date}</TableCell>
            <TableCell>{post.author.username}</TableCell>
            <TableCell>
                <Button variant="contained" color="secondary" onClick={() => {on_click_delete(post.id)}}>
                        BORRAR
                </Button>
            </TableCell>
        </TableRow>
    </Accordion>
*/}

const TBody = (props: any) => {
    let { posts, on_click_delete } = props;

    posts = posts.map((post: any, i: number) => {
        return (
            <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.author.username}</TableCell>
                <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => {on_click_delete(post.id)}}>
                            BORRAR
                    </Button>
                </TableCell>
            </TableRow>
        );
    });


    return (
        <TableBody>
            {posts}
        </TableBody>
    );
};


const Tabla = (props :any) => {
    const { data, on_click_delete, number } = props;


    console.log(data);

    return (
        <Table>
            <THead/>
            <TBody posts={data} on_click_delete={on_click_delete} number={number}/>
        </Table>
    );
};

export default Tabla;
