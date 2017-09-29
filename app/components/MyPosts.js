import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Comment, Modal, Divider, TextArea, Button, Form, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import PostRow from "./Children/PostRow";
import axios from "axios";


class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			info:""
        };
        this.renderModal = this.renderModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createPost = this.createPost.bind(this);
        /*this.handleInput = this.createPost.bind(this);*/
	}

/*	componentWillReceiveProps(newProps) {

		this.setState({posts:newProps.posts});

	}*/

	renderModal(info){
		this.setState({open:true,info:info});
	}

	populatePosts(){
		var posts = this.props.posts;
		return posts.map(function(post,i){
			return(<PostRow post={post} key={i} update={this.props.update} modal={this.renderModal} />);
		}.bind(this));
	}

	handleInput(event) {
		var obj = {};
		obj[event.target.id] = event.target.value;
		localStorage.setItem('comment', obj.body);
	}

	closeModal(){
		this.setState({open:false,info:""});
	}

	createPost() {
		var obj = {
			postId: this.state.info.postId,
			owner: document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
			body: localStorage.getItem("comment")
		};
		/*console.log("BLAM!",obj);*/
		localStorage.removeItem('comment');
		axios.post("/api/Comment", obj).then(res => {
	
			console.log(res);
			this.props.update();
		});
		this.closeModal();
	}

	render() {
		return (
			<Comment.Group size="large">
				<Header as='h3' dividing>My Posts</Header>

				{this.populatePosts()}

				<Modal open={this.state.open} size={'small'}>
				    <Modal.Header>Reply to {this.state.info.user}'s post!</Modal.Header>
				    <Modal.Content image>
				      <Image wrapped size='medium' src={this.state.info.img} />
				      <Modal.Description>
				        <Header>{this.state.info.title}</Header>
				        <p>@ {this.state.info.location}</p>
{/*				        <p>We've found the following gravatar image associated with your e-mail address.</p>
				        <p>Is it okay to use this photo?</p>*/}

				        <Form>

							<TextArea placeholder="Respond here!" id="body" onChange={this.handleInput} required style={{ minHeight:100, minWidth:250}} />
						
						</Form>
				      </Modal.Description>
				    </Modal.Content>
				    <Modal.Actions>
				      <Button color='red' inverted  onClick={this.closeModal}>
				        <Icon name='remove' /> Cancel
				      </Button>
				      <Button color='green' inverted onClick={this.createPost}>
				        <Icon name='checkmark' /> Post Comment
				      </Button>
				    </Modal.Actions>
				</Modal>
			</Comment.Group>
		)
	}
}

export default Posts;