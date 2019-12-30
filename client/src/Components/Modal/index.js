import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class index extends React.Component {
	render() {
		console.log(this.props.isOpen);
		return (
			<Modal>
				<ModalHeader>Edit this page</ModalHeader>
				<ModalBody>
					<div>Content will be here!</div>
				</ModalBody>
			</Modal>
		);
	}
}

export default index;
