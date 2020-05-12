import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'

import {Card, Accordion, Nav} from 'react-bootstrap';


import './tablaPosts.css';

const THead = (props: any) => {

    return (
        <TableHead >
            <TableRow>
                <TableCell>Titulo</TableCell>
                <TableCell>Contenido</TableCell>
                
                <TableCell>Fecha</TableCell>
                
                <TableCell>Usuario</TableCell>
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

// const SingleTBody = (props: any) => {
//     let { post, on_click_delete } = props;

//     post =post;
//     return (
//         <TableRow key={post.id} >
//             <TableCell>{post.content}</TableCell>
//             <TableCell>{post.date}</TableCell>
            
//             <TableCell>
//                 <Button variant="contained" color="secondary" onClick={() => {on_click_delete(post.id)}}>
//                         BORRAR
//                 </Button>
//             </TableCell>
//         </TableRow>
//     );
// };

// const TBodyNew = (props: any) => {
//     let { posts, on_click_delete, number } = props;

//     posts = posts.map((post: any, i: number) => {
//         return (
            

//             <Accordion className="post-list-accordion" key={post.id}>
//                 <Card>
//                     <Accordion.Toggle as={Card.Header} eventKey="0" className="post-title-box text-center"> 
//                         <Nav  className="post-title-box-content justify-content-end">
//                             <Nav.Item>
                                
//                                 <Nav.Link disabled>{post.title}</Nav.Link>
//                             </Nav.Item>
//                             |
//                             <Nav.Item>
//                                 <Nav.Link href="/myprofile">{post.author.username}</Nav.Link>
//                             </Nav.Item>
//                         </Nav>
                            
//                     </Accordion.Toggle>
//                     <Accordion.Collapse eventKey="0">


//                         <Card.Body className="table-content-box">
//                             <div >
//                                 <THead />
//                                 <SingleTBody  post={posts[i]} on_click_delete={on_click_delete}/>   
//                             </div>
                             
//                         </Card.Body>


                        

//                     </Accordion.Collapse>
//                 </Card>
//             </Accordion>
//         );
//     });


//     return (
//         <TableBody>
//             {posts}
//         </TableBody>
//     );
// };


const Tabla = (props :any) => {
    const { data, on_click_delete, number } = props;


    console.log(data);

    return (
        <Table>
            <THead/>
            <TBody posts={data} on_click_delete={on_click_delete} number={number}/>
            {/* <TBodyNew posts={data} on_click_delete={on_click_delete} number={number}/> */}
        </Table>
    );
};

export default Tabla;
