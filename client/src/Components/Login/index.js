import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "./style.css";

class SignIn extends Component {
	state = {
		email: "",
		password: "",
		errorMessage: "",
		loggedIn: false,
		showError: false,
		showNullError: false,
		authorized: false
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	handleSubmit = async e => {
		e.preventDefault();
		const { email, password } = this.state;
		if (email === "" || password === "") {
			this.setState({
				showError: false,
				showNullError: true,
				loggedIn: false
			});
		} else {
			try {
				const response = await axios.post("/auth/login", {
					email,
					password
				});
				localStorage.setItem("JWT", response.data.token);

				this.setState({
					loggedIn: true,
					showError: false,
					showNullError: false,
					authorized: true
				});
				window.location.href = "/profile";
			} catch (error) {
				console.error(error.response);
				this.setState({
					errorMessage: error.response.data.message
				});
				console.log(error);
			}
		}
	};
	render() {
		return (
			<div className="container signinPage">
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Form className="formBox" onSubmit={this.handleSubmit.bind(this)}>
						<h4 className="signinTitle">Sign in</h4>
						<hr style={{ background: "black" }}></hr>
						<FormGroup>
							<Input
								placeholder="Email"
								style={{ float: "right" }}
								type="email"
								id="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<Input
								placeholder="Password"
								style={{ float: "right", marginBottom: "15px" }}
								type="password"
								id="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<Button style={{ marginTop: "15px" }} className="btn-primary ">
								Login
							</Button>
						</FormGroup>
						<p>
							Don't have an account yet? <br />
							<a href="/signup">Click here to register</a>
						</p>
						<h5
							style={{
								textAlign: "center",
								color: "yellow",
								paddingBottom: "10px"
							}}
						>
							{this.state.errorMessage}
						</h5>
					</Form>
				</div>
			</div>
		);
	}
}
export default SignIn;
