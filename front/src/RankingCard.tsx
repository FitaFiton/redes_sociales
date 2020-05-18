import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import axios from 'axios'
import {Card} from 'react-bootstrap';
import history from './history';
import './Rankings_styles.css';

const RankingContent = (props: any) => {
    let { users } = props;
    console.log(users);
    users = users.map((user: any, i: number) => {
        return (
            <div key={user.id}>
                <div className="text-users">

                    <Button onClick={() => {
                                            //Enviar los datos al servidor
                                            //Recopilar los datos
                                            //Peticion

                                            localStorage.setItem('last_profile_id_clicked', user.id);
                                            console.log(localStorage.getItem('last_profile_id_clicked'));
                                            history.push('/profile');
                                        }}><b>{user.username}</b></Button>


                </div>
            </div>
        );
    });

    return (
        <TableBody>
            {users}
        </TableBody>
    );
};

const RankingCard = (props :any) => {
    const { data } = props;


    console.log(data);

    return (
        <RankingContent  users={data}/>
    );
};

export default RankingCard;