import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'

import {Card} from 'react-bootstrap';

const SinglePostCard = (props: any) => {
    let { post, on_click_delete } = props;

    post =post;
    return (
        <TableRow key={post.id} >
            <TableCell>{post.content}</TableCell>
            <TableCell>{post.date}</TableCell>
            
            <TableCell>
                <Button variant="contained" color="secondary" onClick={() => {on_click_delete(post.id)}}>
                        BORRAR
                </Button>
            </TableCell>
        </TableRow>


        
    );
};


const PostCardContent = (props: any) => {
    let { posts, on_click_delete } = props;

    posts = posts.map((post: any, i: number) => {
        return (
            <Card style={{ width: '18rem' }} key={post.id}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
                    <Card.Text>
                    {post.content}
                    </Card.Text>
                    <Card.Link href="#">{post.author.username}</Card.Link>
                    <Card.Link onClick={() => {on_click_delete(post.id)}}>Borrar</Card.Link>
                </Card.Body>
            </Card>
        );
    });

    return (
        <TableBody>
            {posts}
        </TableBody>
    );
};


const PostCard = (props :any) => {
    const { data, on_click_delete, number } = props;


    console.log(data);

    return (
        <PostCardContent/>
    );
};

export default PostCard;