import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Sidebar />
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profile" component={Profile} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
