import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";

function App() {
	const [isAuth, setAuth] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		axios.get("/api/login", { withCredentials: true })
			.then(res => {
				console.log(res.data);
				if (res.status === 200) {
					setAuth(true);
					setUsername(res.data.username);
				}
			}).catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<Router>
			<div className="container">
				<Navbar isAuthenticated={this.state.isAuthenticated} setUser={this.setUser} />
				<br />
				<Route path="/" exact render={() => <Home isAuthenticated={this.state.isAuthenticated} />} />
				<Route path="/login" render={() => <Login setUser={this.setUser} />} />
				<Route path="/register" component={Register} />
			</div>
		</Router >
	);
}

export default App;
