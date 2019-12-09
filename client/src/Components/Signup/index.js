import React, { Component } from "react";
import API from "../../utils/API";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./style.css";
class SignUp extends Component {
	state = {
		username: "",
		firstName: "",
		email: "",
		password: "",
		password2: "",
		errorMsg: ""
	};
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		if (
			!this.state.username ||
			!this.state.firstName ||
			!this.state.email ||
			!this.state.password ||
			!this.state.password2
		) {
			return;
		}
		if (this.state.password !== this.state.password2) {
			this.setState({
				errorMsg: "Passwords don't match!"
			});
			console.log("Passwords don't match!");
			return;
		}
		if (this.state.password.length < 6) {
			this.setState({
				errorMsg: "Password must be at least 6 carachters long!"
			});
			return;
		}

		API.addUser({
			username: this.state.username,
			firstName: this.state.firstName,
			email: this.state.email,
			password: this.state.password
		})
			// .then(alert("You can login now!"))
			.then(
				this.setState({
					username: "",
					firstName: "",
					email: "",
					password: "",
					password2: ""
				})
			)
			.then(res => console.log(res))
			.catch(error => console.log(error));
		window.location.href = "/login";
	};

	render() {
		return (
			<div className="container signinPage">
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Form className="formBoxSignup" onSubmit={this.handleSubmit}>
						<h4
							className="signinTitle"
							style={{ textAlign: "center", marginTop: "15px" }}
						>
							Register
						</h4>
						<FormGroup>
							<hr style={{ background: "grey", marginTop: "10px" }}></hr>
							<div className="input-field">
								<label htmlFor="username">* Username</label>
								<Input
									className="form-control"
									type="text"
									id="username"
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="firstName">* First Name</label>
								<Input
									className="form-control"
									type="text"
									id="firstName"
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="email">* Email</label>
								<Input
									className="form-control"
									type="text"
									id="email"
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password">* Password</label>
								<Input
									className="form-control"
									type="password"
									id="password"
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password2">* Confirm Password</label>
								<Input
									className="form-control"
									type="password"
									id="password2"
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<Button
									style={{ marginTop: "30px" }}
									className="btn-primary lighten-1 z-depth-0"
								>
									Create Account
								</Button>
							</div>
						</FormGroup>
					</Form>
					<h4
						style={{
							textAlign: "center",
							color: "red",
							paddingBottom: "10px"
						}}
					>
						{this.state.errorMsg}
					</h4>
				</div>
			</div>
		);
	}
}

export default SignUp;
