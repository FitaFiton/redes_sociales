import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'
import './PostCardView_styles.css';
import history from './history';
import {Card} from 'react-bootstrap';

const PostCardContent = (props: any) => {
    let { posts, on_click_delete } = props;

    posts = posts.map((post: any, i: number) => {
        console.log(post.author.username);
        let author_id: string = post.author.id;
        console.log(author_id)
        return (
            <Card key={post.id} className="post-card-box">
                <Card.Body className="text-right" key={post.id}>
                    <Card.Title >{post.title}</Card.Title>
                    
                    <Card.Text className="text-justify">
                    {post.content}
                    </Card.Text>
                    <br/>
                    <Card.Subtitle  className="text-muted post-date-text">{post.date}</Card.Subtitle>

                    
                    
                    {
                        (post.author.username == localStorage.getItem("username")) ?
                            
                            <Button  onClick={() => {
                                     //Enviar los datos al servidor
                                     //Recopilar los datos
                                     //Peticion

                                    localStorage.setItem('last_profile_id_clicked', post.author.id);
                                    console.log(localStorage.getItem('last_profile_id_clicked'));
                                    history.push('/profile');
                                }}>

                            [propio]
                            {post.author.username}
                            </Button>
                            :
                            <Button  onClick={() => {
                                     //Enviar los datos al servidor
                                     //Recopilar los datos
                                     //Peticion

                                    localStorage.setItem('last_profile_id_clicked', post.author.id);
                                    console.log(localStorage.getItem('last_profile_id_clicked'));
                                    history.push('/profile');
                                }}>

                            [otro] 
                            {post.author.username}
                            </Button>
                    }

                    {
                        (post.author.username == localStorage.getItem("username")) ?
                            <Card.Link href="#" onClick={() => { on_click_delete(post.id)}}><i className="fas fa-trash-alt fa-lg "></i></Card.Link>
                            :
                            <div></div>
                    }

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
        <PostCardContent  posts={data} on_click_delete={on_click_delete} number={number}/>
    );
};

export default PostCard;
