import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
// import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./style.css";
import axios from "axios";

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			authorized: false
		};
	}

	async componentDidMount() {
		var elem = document.querySelector(".sidenav");
		// eslint-disable-next-line
		var instance = M.Sidenav.init(elem, {
			edge: "left",
			inDuration: 250
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
					authorized: true
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
				<div className="sideBarMainCompAuth">
					<ul id="slide-out" className="sidenav">
						<li />
						<li>
							<a href="/">
								<img
									className="logoHamburguer"
									alt="logo"
									src="./Images/diaryTitleAnimated.gif"
								/>
							</a>
						</li>
						<li>
							<a className="sidebarLinks" href="/">
								Home
							</a>
						</li>
						<li>
							<a className="sidebarLinks" href="/aboutus">
								About This site
							</a>
						</li>
						<li>
							<a className="sidebarLinks" href="/profile">
								My Diary
							</a>
						</li>
						<li>
							<p className="usernameLoggedInHamburguer">
								Logged in as {username}
							</p>
						</li>
						<button
							className="logoutBtnHomeSideBar"
							onClick={this.handleLogOut}
						>
							Logout
						</button>
					</ul>
					<a
						href="/"
						data-target="slide-out"
						className="sidenav-trigger menuIcon"
					>
						<div className="menuTitleAuth iconHamburguer">
							<div className="hamburguerIconLines"></div>
							<div className="hamburguerIconLines"></div>
							<div className="hamburguerIconLines"></div>
						</div>
					</a>
				</div>
			);
		}

		return (
			<div className="sideBarMainComp">
				<ul id="slide-out" className="sidenav">
					<li />
					<li>
						<a href="/">
							<img
								className="logoHamburguer"
								alt="logo"
								src="./Images/diaryTitleAnimated.gif"
							/>
						</a>
					</li>
					<li>
						<a className="sidebarLinks" href="/">
							Home
						</a>
					</li>
					<li>
						<a className="sidebarLinks" href="/aboutus">
							About This site
						</a>
					</li>

					{/* // eslint-disable-next-line */}
					<li>
						<a className="waves-effect  sidebarLinks" href="/signup">
							Signup
						</a>
					</li>
					<li>
						<a className="waves-effect sidebarLinks" href="/login">
							Login
						</a>
					</li>
				</ul>
				<a
					href="/"
					data-target="slide-out"
					className="sidenav-trigger menuIcon"
				>
					<div className="menuTitleAuth iconHamburguer">
						<div className="hamburguerIconLines"></div>
						<div className="hamburguerIconLines"></div>
						<div className="hamburguerIconLines"></div>
					</div>
				</a>
			</div>
		);
	}
}

export default Sidebar;
