import React, {Component} from 'react';
import axios from 'axios';
import './Rankings_styles.css';
import RankingCard from "./RankingCard"
export class Rankings extends Component {

    state = {
        users_most_followers: [],
        users_most_posts: [],
    };

    constructor(props: any) {
        super(props);
        axios.get('http://127.0.0.1/api/user/?filterByMostFollowers=1').then((response) => {
            console.log(response);
            this.setState({
                users_most_followers: response.data,
            });
            console.log("USER")

        axios.get('http://127.0.0.1/api/user/?filterByByMostPosts=1').then((response) => {
                console.log(response);

                this.setState({
                    users_most_posts: response.data,
                });
            });

        });

    }

     render() {
        return( <div>
                    <div className="most-followers-box">
                        <div className="text-title">
                        <b>Most Followers </b>
                        <i className="fas fa-award"></i>
                        </div>

                        <RankingCard data={this.state.users_most_followers}/>
                    </div>
                    <div className="most-posts-box">
                        <div className="text-title">
                        <b>Most Posts </b>
                        <i className="fas fa-award"></i>
                        </div>
                        <RankingCard data={this.state.users_most_posts}/>
                    </div>
                </div>);
     }
}