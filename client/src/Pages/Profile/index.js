import React, { Component } from "react";
import axios from "axios";
import API from "../../utils/API";
import Fade from "react-reveal/Fade";
import FlipPage from "react-flip-page";
import "./style.css";

class index extends Component {
	state = {
		user_id: "",
		textToSave: "",
		name: "",
		username: "",
		email: "",
		isLoading: true,
		error: false,
		pages: [],
		toggleBookPages: false,
		toggleBookCover: false
	};

	async componentDidMount() {
		const accessString = localStorage.getItem("JWT");
		if (accessString == null) {
			this.setState({
				isLoading: false,
				error: true
			});
		} else {
			try {
				const response = await axios.get("/auth/profile", {
					headers: { Authorization: `JWT ${accessString}` }
				});

				this.setState({
					user_id: response.data._id,
					name: response.data.firstName,
					username: response.data.username,
					email: response.data.email,
					password: response.data.password,
					isLoading: false,
					error: false
				});
			} catch (error) {
				console.error(error.response);
				this.setState({
					error: true
				});
			}
		}
	}

	toggleBookPagesHandler = () => {
		this.setState({
			toggleBookPages: !this.state.toggleBookPages,
			toggleBookCover: false
		});
	};

	toggleBookCoverHandler = () => {
		this.setState({
			toggleBookCover: !this.state.toggleBookCover
		});
	};

	onChangeText = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		window.location.href = "/login";
	}

	getAllPagesBook = async e => {
		this.toggleBookCoverHandler();
		this.setState({
			toggleBookPages: false
		});
		e.preventDefault();
		const _id = this.state.user_id;
		API.getAllPagesBook(_id)
			.then(res => {
				this.setState({
					pages: res.data.text
				});
				console.log(this.state.pages);
			})
			.catch(err => console.log(err));
	};

	saveText = async e => {
		e.preventDefault();
		let textToSave = this.state.textToSave;
		const _id = this.state.user_id;
		let newText = { text: textToSave };
		await API.saveText(_id, newText)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
		window.location.href = "/profile";
	};

	async deletePage({ currentTarget }) {
		let _id = currentTarget.value;
		if (
			window.confirm(`Are you sure you wish to delete this Page permanently?`)
		) {
			await API.deletePage(_id)
				.then(res => console.log(res))
				.catch(err => console.log(err));
			window.location.href = "/profile";
		}
	}

	render() {
		const { isLoading, error } = this.state;
		if (error) {
			return (
				<div
					style={{
						marginTop: "60px",
						fontSize: "30px",
						height: "100vh"
					}}
				>
					...Problem fetching user data. Please login again
					{/* <span role="img" aria-label="Face With Rolling Eyes Emoji">
						🙄
					</span> */}
				</div>
			);
		}
		if (isLoading) {
			return (
				<div
					style={{
						marginLeft: "10%",
						fontSize: "30px",
						height: "100vh"
					}}
				>
					Loading User Data...
				</div>
			);
		}

		const pages = this.state.pages;
		const pagesList = pages.length
			? pages.map(page => {
					return (
						<div className="articleContent" key={page._id}>
							<button
								value={page._id}
								onClick={this.deletePage}
								className="deleteBtn"
							>
								Delete
							</button>
							<article className="articleContent">{page.text}</article>
						</div>
					);
			  })
			: null;

		return (
			<div>
				<button className="openBookBtn" onClick={this.getAllPagesBook}>
					Open Your Diary
				</button>
				<button
					className="openBookEmptyPageBtn"
					onClick={this.toggleBookPagesHandler}
				>
					Empty Page
				</button>
				<div>
					{this.state.toggleBookCover ? (
						<Fade bottom>
							<div className="bookCover">
								<h1 className="profileTitle">{this.state.name}'s Diary</h1>
								<FlipPage
									uncutPages="true"
									showSwipeHint="true"
									pageBackground="rgb(230, 216, 95)"
									className="flipPageComponent"
									width="500"
									height="500"
									orientation="horizontal"
								>
									{pagesList}
								</FlipPage>
							</div>
						</Fade>
					) : null}
				</div>

				{this.state.toggleBookPages ? (
					<Fade bottom>
						<div className="book">
							<h1 className="profileTitle">{this.state.name}'s Diary</h1>
							<form onSubmit={this.saveText}>
								<textarea
									name="textToSave"
									defaultValue={this.state.textToSave}
									onChange={this.onChangeText}
									className="bookInput"
									rows="60"
									cols="50"
									placeholder="Start Typing"
								/>
								<button className="saveButton">Save</button>
							</form>
						</div>
					</Fade>
				) : null}
			</div>
		);
	}
}

export default index;
