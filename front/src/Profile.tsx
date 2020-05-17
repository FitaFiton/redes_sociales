import React, {Component} from 'react';
import axios from 'axios'
import { Row, Container, Col, Card,Button, Image} from 'react-bootstrap';
import './MyProfile_styles.css';
import PostCard from "./PostCardView"

let config = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
};

export class Profile extends Component {

    state = {
        user: {
            id: 0,
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            creation_date: "",
            profile: {
                music: false,
                literature: false,
                sport: false,
                party: false,
                art: false,
                image: "",
            }
        },
        posts: [],
    };

    constructor(props: any) {
        super(props);
        console.log("id del usuario a buscar");
        console.log(localStorage.getItem('last_profile_id_clicked'));
        axios.get('http://127.0.0.1:8000/api/user/' + localStorage.getItem('last_profile_id_clicked') + '/', config).then((response) => {
            console.log(response);
            response.data.profile.image = 'http://127.0.0.1:8000' + response.data.profile.image
            this.setState({
                user: response.data,
            });
            console.log("USER")

            axios.get('http://127.0.0.1:8000/api/post/?filterByProfile=' + this.state.user.id).then((response) => {
                console.log(response);

                this.setState({
                    posts: response.data,
                });
                console.log(this.state.posts);
            });

        });

    }

    componentDidMount(): void {

    }

    onDeletePost = (post_id: number) => {

        axios.delete('http://127.0.0.1:8000/api/post/' + post_id + '/', config).then(response => {
            console.log(response);

            if (response.status === 200) {
                const new_posts = this.state.posts.filter((post: any) => {
                    return post.id !== post_id;
                });

                this.setState({
                    posts: new_posts
                });
            }
        });
    };

    render() {

        return(
            <div>

            <Container fluid="md">
                <Row className= "separator">
                    <Col className="box-1 rounded-border">1 of 1</Col>
                </Row>
            </Container>

                <Container fluid="md" className="rounded-border">
                    <Row >

                        <Col  className="profile-image-box rounded-border">
                            <Image className="image-exammple" src={this.state.user.profile.image} roundedCircle />
                        </Col>

                        <Col className="box-4 separator rounded-border" xs={9}>

                        </Col>

                    </Row>
                </Container>



                <Container fluid="md">

                    <Row className="box-2-3" >
                        <Col className="box-2 rounded-border">1 of 3</Col>

                        <Col xs={9} className="box-3 rounded-border">

                            {/* <div className = "post-list-atributes">
                                <Tabla data={this.state.posts} on_click_delete={this.onDeletePost} number={1}> </Tabla>
                            </div> */}


                            <PostCard  data={this.state.posts} on_click_delete={this.onDeletePost} number={1}></PostCard>


                        </Col>
                    </Row>

                </Container>

            </div>

        );
    }
}
