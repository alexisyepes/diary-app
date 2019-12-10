import axios from "axios";

export default {
	getUser: id => {
		return axios.get("/api/users/" + id);
	},
	addUser: newUser => {
		return axios.post("/auth/signup", newUser);
	},
	logginUser: existingUser => {
		return axios.post("/api/users/login", existingUser);
	},
	saveText: (_id, newText) => {
		return axios.post("/users/" + _id, newText);
	},
	getAllPagesBook: _id => {
		return axios.get("/auth/users/" + _id);
	},
	deletePage: _id => {
		return axios.delete("/diary/page/" + _id);
	}
};
