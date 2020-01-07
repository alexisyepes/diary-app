import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/API";
import Fade from "react-reveal/Fade";
import FlipPage from "react-flip-page";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
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
	const [textToEdit, setTextToEdit] = useState("");
	const [modalToEdit, setModalToEdit] = useState(false);
	const [pageId, setPageId] = useState("");

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

	const toggleModalToEdit = async ({ currentTarget }) => {
		if (modalToEdit === false) {
			setTextToEdit("");
			setPageId("");
		}
		setModalToEdit(!modalToEdit);
		setPageId(currentTarget.value);
		const _id = currentTarget.value;
		console.log(_id);
		await API.getOnePageBook(_id)
			.then(res => {
				setTextToEdit(res.data.text);
			})
			.catch(err => console.log(err));
	};

	const textChangesSubmit = async e => {
		e.preventDefault();
		const _id = pageId;
		let data = { text: textToEdit };
		await API.updateOnePageBook(_id, data)
			.then(() => {
				window.location.href = "/profile";
			})
			.catch(err => console.log(err));
	};

	const getAllPagesBook = async e => {
		e.preventDefault();
		toggleBookCoverHandler();
		setToggleBookPages(false);

		const _id = user_id;
		await API.getAllPagesBook(_id)
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
					marginTop: "100px",
					fontSize: "30px",
					height: "100vh",
					color: "white"
				}}
			>
				<h3>...Problem fetching user data. Please login again</h3>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div
				style={{
					marginTop: "100px",
					color: "white",
					fontSize: "30px",
					height: "100vh"
				}}
			>
				Loading User Data...
			</div>
		);
	}

	const pagesList = pages.length ? (
		pages.map(page => {
			return (
				<div className="articleContent" key={page._id}>
					<button value={page._id} onClick={deletePage} className="deleteBtn">
						Delete
					</button>
					<button className="bookEmptyPageBtn" onClick={toggleBookPagesHandler}>
						Empty Page
					</button>
					<button
						className="openBookEditPageBtn"
						value={page._id}
						onClick={toggleModalToEdit}
					>
						Edit Text
					</button>
					<hr style={{ background: "white" }} />
					<article className="articleContent">{page.text}</article>
				</div>
			);
		})
	) : (
		<p className="messageWhenNoContentOnBook">
			Your diary is empty. <br /> Click the Empty Page Button to start
		</p>
	);

	return (
		<div className="container profileMainContainer">
			<button className="openBookBtn" onClick={getAllPagesBook}>
				Open / Close Your Diary
			</button>
			<button className="openBookEmptyPageBtn" onClick={toggleBookPagesHandler}>
				Empty Page
			</button>
			<div>
				<Modal isOpen={modalToEdit} toggle={toggleModalToEdit}>
					<ModalHeader toggle={toggleModalToEdit}>
						<p>TestModal Header</p>
					</ModalHeader>
					<ModalBody>
						<form onSubmit={textChangesSubmit}>
							<input
								onChange={e => setTextToEdit(e.target.value)}
								defaultValue={textToEdit}
								type="text"
							/>
							<button>Save Changes</button>
						</form>
					</ModalBody>
				</Modal>
			</div>
			<div>
				{toggleBookCover ? (
					<Fade>
						<div className="bookCover">
							<h1 className="profileTitle">This Diary Belongs to {name}</h1>
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
				) : (
					<h4
						style={toggleBookPages ? { display: "none" } : { display: "block" }}
						className="messageBeneathBooks"
					>
						↑ <br /> Use the buttons above
					</h4>
				)}
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
