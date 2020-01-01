import React, { Component } from "react";
import "./style.css";

class index extends Component {
	render() {
		return (
			<div className="container wrapper">
				<h1 className="homeTitle">Your personal diary</h1>
				<h5 className="homeSubTitle">
					Create an account and start writing on your diary
				</h5>
				<img
					className="imgRegister"
					src="./Images/diaryRegisterScreenshot.JPG"
					alt="register"
				/>
				<img
					className="imgDiary1"
					src="./Images/diaryScreenshot.JPG"
					alt="diary"
				/>
				<img
					className="imgDiary2"
					src="./Images/diaryScreenshot2.JPG"
					alt="diary"
				/>
			</div>
		);
	}
}

export default index;
