import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import axios from "axios";

class RemoveFriend extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.removeFriend = this.removeFriend.bind(this);
	}

	handleOpen() {
		this.setState({ open: !this.state.open });
	}

	removeFriend() {
		console.log(this.props.id);
		console.log(this.props.friendId);
		axios.get("/api/User/" + this.props.id + "/Unfriend/" + this.props.friendId).then(res => {
			this.props.updateParent();
			this.handleOpen();
		})
	}

	render() {
		return(
			<Modal
				open={this.state.open}
				trigger={<Button size="mini" color="red" floated="right" onClick={this.handleOpen}>Remove</Button>}
				basic size='small'>
			<Icon key="close" name="close" onClick={this.handleOpen} />
			    <Header icon='archive' content='Remove Friend' />
			    <Modal.Content>
			      <p>Are you sure you want to remove {this.props.friendName}?</p>
			    </Modal.Content>
			    <Modal.Actions>
			      <Button basic color='red' inverted onClick={this.handleOpen}>
			        <Icon name='remove' /> No
			      </Button>
			      <Button color='green' inverted onClick={this.removeFriend}>
			        <Icon name='checkmark' /> Yes
			      </Button>
			    </Modal.Actions>
			</Modal>
		)
	}
}

export default RemoveFriend;