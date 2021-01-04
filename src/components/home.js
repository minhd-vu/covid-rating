import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";

export default function Home() {
    const user = useContext(UserContext);

    return (
        <p>Hello!</p>
    );
}