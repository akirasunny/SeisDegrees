import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form, TextArea, Image } from 'semantic-ui-react';
import axios from "axios";

class PostHolder extends Component {
	constructor(props) {
		super(props);

		this.handleInput = this.handleInput.bind(this);
		this.updatePost = this.updatePost.bind(this);
	}

	handleInput(event) {
		var obj = {};
		obj[event.target.id] = event.target.value;
		this.setState(obj);
	}

	updatePost() {
		var postId = this.props.currentPost._id;
		this.state.body = this.state.body.replace(/\n/g,"<br />");
		axios.post("/api/Post/Update/" + postId, this.state).then(res => {
			this.props.editClose();
		})
	}

	render() {
		var post = this.props.currentPost;
		return (
			<Modal open={this.props.editOpen} size={'small'}>
			    <Modal.Header>Edit post: {post.title}</Modal.Header>
				<Form style={{ padding: 20 }}>
					<label>Title</label>
					<Form.Input id="title" onChange={this.handleInput} required defaultValue={post.title} />
					<label>Location</label>
					<Form.Input id="location" onChange={this.handleInput} required defaultValue={post.location}/>
				<Form.TextArea  id="body" onChange={this.handleInput} required style={{ minHeight: 100 }} >
					{post.body.replace(new RegExp("<br />", "g"), "\n")}
				</Form.TextArea>
			   </Form>
			    <Modal.Actions>
			      <Button color='red' inverted  onClick={this.props.editClose}>
			        <Icon name='remove' /> Cancel
			      </Button>
			      <Button color='green' inverted onClick={this.updatePost}>
			        <Icon name='checkmark' /> Post Comment
			      </Button>
			    </Modal.Actions>
			</Modal>
		)
	}
}

export default PostHolder;