import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";

import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import About from "./components/about";
import Home from "./components/home";
import Profile from "./components/profile";

import { UserContext } from "./contexts/user.context";

export default class App extends Component {
	static contextType = UserContext;

	componentDidMount() {
		axios.get("/api/login", { withCredentials: true })
			.then(res => {
				console.log(res.data);
				if (res.status === 200) {
					this.context.setIsAuth(true);
					this.context.setUsername(res.data.username);
					this.context.setPartyCode(res.data.partyCode);
					this.context.setIsAdmin(res.data.isAdmin);
				}
			}).catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<Router>
				<Header />
				<br />
				<Container>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/about" component={About} />
					<Route path="/user/:username" render={props => <Profile {...props} />} />
				</Container>
				<br />
				<br />
				<br />
				<Footer />
			</Router >
		);
	}
}
