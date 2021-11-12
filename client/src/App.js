import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import AuthContextProvider from "./contexts/AuthContext";
import { CardFooter } from "reactstrap";
import Modal from "./Components/Modal";

const App = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);

	return (
		<Router>
			<Modal isOpen={isModalOpen} />
			<div className="App">
				<AuthContextProvider>
					<Navbar />
				</AuthContextProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/profile" component={Profile} />
				</Switch>
				<CardFooter className="footer">
					Alexis Yepes Sanabria 2020 ©{" "}
					<a target="blank" href="https://github.com/alexisyepes/diary-app">
						Click for code reference
					</a>
				</CardFooter>
			</div>
		</Router>
	);
};

export default App;
