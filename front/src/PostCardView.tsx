import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'
import './PostCardView_styles.css';

import {Card} from 'react-bootstrap';

const PostCardContent = (props: any) => {
    let { posts, on_click_delete } = props;

    posts = posts.map((post: any, i: number) => {
        return (
            <Card key={post.id} className="post-card_box">
                <Card.Body className="text-right" key={post.id}>
                    <Card.Title >{post.title}</Card.Title>
                    
                    <Card.Text className="text-justify">
                    {post.content}
                    </Card.Text>
                    <br/>
                    <Card.Subtitle  className="mb-2 text-muted post-date-text">{post.date}</Card.Subtitle>

                    <Card.Link href="/myprofile">{post.author.username}</Card.Link>
                    <Card.Link href="#" onClick={() => {on_click_delete(post.id)}}><i className="fas fa-trash-alt fa-lg "></i></Card.Link>
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
        <PostCardContent posts={data} on_click_delete={on_click_delete} number={number}/>
    );
};

export default PostCard;