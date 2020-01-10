import React, { Component } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

class index extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);

		this.state = {
			imageGif: "",
			isOpen: false
		};
	}

	async componentDidMount() {
		this.setState({
			imageGif: "./Images/diaryTitleAnimated.gif"
		});
	}

	toggle = () =>
		this.setState({
			isOpen: !this.state.isOpen
		});

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		window.location.href = "/";
	}

	render() {
		const { authorized, username } = this.context;

		return (
			<div className="appHeader">
				<img className="logoHome" alt="gif logo" src={this.state.imageGif} />
				<Navbar color="warning" light expand="lg">
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						{authorized ? (
							<Nav className="mr-auto" navbar>
								<NavItem className="authNavItemNavbar">
									<p className="usernameLoggedinHome">
										Logged in as: {username}
									</p>
								</NavItem>
								<NavItem className="authNavItemNavbarBtn">
									<button
										className="logoutBtnNavbar"
										onClick={this.handleLogOut}
									>
										Logout
									</button>
								</NavItem>
							</Nav>
						) : (
							<Nav className="mr-auto" navbar>
								<NavItem className="navItemNavbar">
									<NavLink href="/">Home</NavLink>
								</NavItem>
								<NavItem className="navItemNavbar">
									<NavLink href="/signup">Register</NavLink>
								</NavItem>
								<NavItem className="navItemNavbar">
									<NavLink href="/login">Login</NavLink>
								</NavItem>
								<NavItem className="navItemNavbar">
									<NavLink
										href="https://github.com/alexisyepes/diary-app"
										target="blank"
									>
										GitHub
									</NavLink>
								</NavItem>{" "}
							</Nav>
						)}
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default index;
