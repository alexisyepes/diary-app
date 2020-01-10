import React, { createContext, Component } from "react";
import axios from "axios";
export const AuthContext = createContext();

class AuthContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authorized: false,
			username: ""
		};
	}

	async componentDidMount() {
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
	render() {
		return (
			<AuthContext.Provider value={{ ...this.state }}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export default AuthContextProvider;
