import React, { Component } from "react";
import axios from "axios";

import "./style.css";

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			authorized: false,
			imageGif: ""
		};
	}

	async componentDidMount() {
		this.setState({
			imageGif: "./Images/diaryTitleAnimated.gif"
		});
		const accessString = localStorage.getItem("JWT");
		if (accessString == null) {
			this.setState({
				authorized: false,
				username: ""
			});
		} else {
			try {
				const response = await axios.get("/auth/profile", {
					headers: { Authorization: `JWT ${accessString}` }
				});
				this.setState({
					username: response.data.username,
					authorized: true,
					imageGif: "./Images/diaryTitleAnimated.gif"
				});
			} catch (error) {
				console.error(error.response);
			}
		}
	}

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		window.location.href = "/";
	}

	render() {
		const username = this.state.username;
		const authorized = this.state.authorized;

		if (authorized) {
			return (
				<div className="appHeader">
					<img className="logoHome" alt="gif logo" src={this.state.imageGif} />
					<nav className="navbar navbar-expand-lg navbar-custom">
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">
								<a className="nav-item nav-link active" href="/">
									Home <span className="sr-only">(current)</span>
								</a>

								<a className="nav-item nav-link" href="/profile">
									My Diary
								</a>
							</div>
							<p className="usernameLoggedinHome">Logged in as {username}</p>
							<button className="logoutBtnNavbar" onClick={this.handleLogOut}>
								Logout
							</button>
						</div>
					</nav>
				</div>
			);
		}

		return (
			<div className="appHeader">
				<img className="logoHome" alt="gif logo" src={this.state.imageGif} />
				<nav className="navbar navbar-expand-lg navbar-custom">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<a
								className="nav-item nav-link active linksNavbarNoAuth"
								href="/"
							>
								Home <span className="sr-only">(current)</span>
							</a>

							<a className="nav-item nav-link linksNavbarNoAuth" href="/signup">
								Register
							</a>
							<a className="nav-item nav-link linksNavbarNoAuth" href="/login">
								Login
							</a>
						</div>
					</div>
				</nav>{" "}
			</div>
		);
	}
}

export default index;
