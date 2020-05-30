import axios from 'axios'
import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import NewFriendCard from "./NewFriendCard"


export class NewFriends extends Component {

    state = {
        users: [],
        user_information: {
            music: false,
            literature: false,
            sport: false,
            party: false,
            art: false,
            image: null,
        },
        actual_friends:[],
    };
    constructor(props: any) {
        super(props);
        axios.get('http://127.0.0.1/api/user/' + localStorage.getItem("user_id") + '/').then((response) => {
            console.log(response);
            this.setState({
                user_information: response.data.profile,
            });
        });
        axios.get('http://127.0.0.1/api/friend/?filterByUser=' + localStorage.getItem("user_id")).then((response) => {
            console.log(response);
            let user_friends: any[] = [];
            let friends_to_filter = response.data;

            for (var val of friends_to_filter){
                user_friends.push(val['friend_id'])
            }
            this.setState({
                actual_friends: user_friends,
            });

        });
        axios.get('http://127.0.0.1/api/user/').then((response) => {
            console.log(response);
            this.setState({
                users: response.data,
            });

            let pleasures_match = 0;
            let pleasures_array = [];
            var hostname = /backend/gi;
            for (var val of this.state['users']){
                if (val['profile'] === null){
                    pleasures_match = 0;
                }
                else{
                    let image_url: string = val['profile']['image'];
                    val['profile']['image'] = image_url.replace(hostname, "127.0.0.1");
                    if (val['profile']['music'] === this.state['user_information']['music']){
                        pleasures_match++;
                    }
                    if (val['profile']['literature'] === this.state['user_information']['literature']){
                        pleasures_match++;
                    }
                    if (val['profile']['sport'] === this.state['user_information']['sport']){
                        pleasures_match++;
                    }
                    if (val['profile']['party'] === this.state['user_information']['party']){
                        pleasures_match++;
                    }
                    if (val['profile']['art'] === this.state['user_information']['art']){
                        pleasures_match++;
                    }
                }
                pleasures_array.push(pleasures_match);
                pleasures_match = 0;
            }

            let sorted_array: any[] = [];
            for (let i = 0; i < pleasures_array.length; i++){
                let index = pleasures_array.indexOf(Math.max(...pleasures_array));
                if (this.state.users[index]['username'] !== localStorage.getItem("username")
                    && this.state.users[index]['profile'] !== null
                    && !(this.state.actual_friends.includes(this.state.users[index]['id']))
                                    ) {
                    sorted_array.push(this.state.users[index])
                }
                pleasures_array[index] = -1;
            }

            this.setState({
                users: sorted_array,
            });

        });
        //window.location.reload(false);
    }

    componentDidMount(): void {


    }


    render() {

        return(
            <div>

            <NewFriendCard data={this.state.users}></NewFriendCard>
            </div>

        );
    }
}