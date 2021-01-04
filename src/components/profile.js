import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(props) {
    const { username } = props.match.params;

    useEffect(() => {
        axios.get("/api/user/" + username, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

    return (
        <p>User Profile</p>
    );
}