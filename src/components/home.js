import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import Map from "./map"

export default function Home() {
    const user = useContext(UserContext);

    return (
        <Map/>
    );
}