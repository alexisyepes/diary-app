import React from "react";
import { Modal, ModalBody } from "reactstrap";
import "./style.css";

const CustomModal = (props) => {
	return (
		<Modal className="modal-component" isOpen={props.isOpen}>
			<ModalBody>
				<h4 className="text-center">Site is under maintenance</h4>
				<div className="img-wrapper">
					<img alt="plumber" className="plumber" src="./Images/plumber.png" />
				</div>
			</ModalBody>
		</Modal>
	);
};

export default CustomModal;
