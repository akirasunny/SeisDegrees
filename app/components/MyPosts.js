import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Comment, Modal, Divider, Button, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import PostRow from "./Children/PostRow";

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			info:""
        };
        this.renderModal = this.renderModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderLocationText = this.renderLocationText.bind(this);
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

	closeModal(){
		this.setState({open:false,info:""});
	}

	renderLocationText(){
		if(this.state.info.location){
			return "/" + this.state.info.location + "/";
		}
	}

	render() {
		return (
			<Comment.Group size="large">
				<Header as='h3' dividing>My Posts</Header>
				{this.populatePosts()}
				<Modal open={this.state.open}>
				    <Modal.Header>Add a Comment: {this.renderLocationText()}</Modal.Header>
				    <Modal.Content image>
				      <Image wrapped size='medium' src={this.state.info.img} />
				      <Modal.Description>
				        <Header>{this.state.info.user}</Header>
				        <p>We've found the following gravatar image associated with your e-mail address.</p>
				        <p>Is it okay to use this photo?</p>
				      </Modal.Description>
				    </Modal.Content>
				    <Modal.Actions>
				      <Button color='red' inverted  onClick={this.closeModal}>
				        <Icon name='remove' /> Cancel
				      </Button>
				      <Button color='green' inverted onClick={this.closeModal}>
				        <Icon name='checkmark' /> Post Comment
				      </Button>
				    </Modal.Actions>
				</Modal>
			</Comment.Group>
		)
	}
}

export default Posts;