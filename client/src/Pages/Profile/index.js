import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/API";
import Fade from "react-reveal/Fade";
import FlipPage from "react-flip-page";
import Modal from "../../Components/Modal";
import "./style.css";

const index = props => {
	const [user_id, setUser_id] = useState("");
	const [textToSave, setTextToSave] = useState("");
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [pages, setPages] = useState([]);
	const [toggleBookPages, setToggleBookPages] = useState(false);
	const [toggleBookCover, setToggleBookCover] = useState(false);

	useEffect(() => {
		const accessString = localStorage.getItem("JWT");
		if (accessString == null) {
			setIsLoading(false);
			setError(true);
		} else {
			try {
				const fetchData = async () => {
					const response = await axios.get("/auth/profile", {
						headers: { Authorization: `JWT ${accessString}` }
					});
					setUser_id(response.data._id);
					setName(response.data.firstName);
					setIsLoading(false);
					setError(false);
				};

				fetchData();
			} catch (error) {
				console.log(error.response);
				setError(true);
			}
		}
	}, []);

	const toggleBookPagesHandler = () => {
		setToggleBookPages(!toggleBookPages);
		setToggleBookCover(false);
	};

	const toggleBookCoverHandler = () => {
		setToggleBookCover(!toggleBookCover);
	};

	const getAllPagesBook = async e => {
		e.preventDefault();
		toggleBookCoverHandler();
		setToggleBookPages(false);

		const _id = user_id;
		API.getAllPagesBook(_id)
			.then(res => {
				setPages(res.data.text);
			})
			.catch(err => console.log(err));
	};

	const saveText = async e => {
		e.preventDefault();
		const _id = user_id;
		let newText = { text: textToSave };
		await API.saveText(_id, newText)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
		window.location.href = "/profile";
	};

	const deletePage = async ({ currentTarget }) => {
		let _id = currentTarget.value;
		if (
			window.confirm(`Are you sure you wish to delete this Page permanently?`)
		) {
			await API.deletePage(_id)
				.then(res => console.log(res))
				.catch(err => console.log(err));
			window.location.href = "/profile";
		}
	};

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

	const pagesList = pages.length
		? pages.map(page => {
				return (
					<div className="articleContent" key={page._id}>
						<button value={page._id} onClick={deletePage} className="deleteBtn">
							Delete
						</button>
						<button
							className="bookEmptyPageBtn"
							onClick={toggleBookPagesHandler}
						>
							Empty Page
						</button>
						<button onClick={props.toggle}>Edit</button>
						<Modal />
						<article className="articleContent">{page.text}</article>
					</div>
				);
		  })
		: null;

	return (
		<div>
			<button className="openBookBtn" onClick={getAllPagesBook}>
				Open / Close Your Diary
			</button>
			<button className="openBookEmptyPageBtn" onClick={toggleBookPagesHandler}>
				Empty Page
			</button>

			<div>
				{toggleBookCover ? (
					<Fade>
						<div className="bookCover">
							<h1 className="profileTitle">{name}'s Diary</h1>
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

			{toggleBookPages ? (
				<Fade>
					<div className="book">
						<h1 className="profileTitle">{name}'s Diary</h1>
						<form onSubmit={saveText}>
							<textarea
								name="textToSave"
								defaultValue={textToSave}
								onChange={e => setTextToSave(e.target.value)}
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
};

export default index;
