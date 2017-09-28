import React, { Component } from 'react'
import {
  Container, Comment, Divider, Modal, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import PostRowComment from "./Grandchildren/PostRowComment";

class PostRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postId: props.post._id,
            /*post: props.post,*/
            user: props.post.owner.username,
            userId: props.post.owner._id,
            img: props.post.owner.img,
            open:false,
            location: props.post.location/*,
            comments: props.post.comments*/
        };
        this.activateLasers = this.activateLasers.bind(this);
	}

/*	componentWillReceiveProps(newProps) {

		this.setState({post:newProps.post,comments:newProps.post.comments});

	}*/

	activateLasers(){
		this.props.update();
		this.props.modal(this.state);
	}

	renderComments(){
		var comments = this.props.post.comments;
		return comments.map(function(comment,i){
			return(<PostRowComment comment={comment} key={i} update={this.props.update} modal={this.props.modal} />);
		}.bind(this))
	}

	render() {
		return (
		    <Comment>
		      <Comment.Avatar src={this.state.img} />
		      <Comment.Content>
		        <Comment.Author as='a'>{this.state.username}</Comment.Author>
		        <Comment.Metadata>
		          <div>Today at 5:42PM</div>
		        </Comment.Metadata>
		        <Comment.Text>{this.state.location}</Comment.Text>
		        <Comment.Actions>
		          <Comment.Action onClick={this.activateLasers}>Reply</Comment.Action>
		        </Comment.Actions>
		      </Comment.Content>
		       	<Comment.Group>
		       		{this.renderComments()}
		    	</Comment.Group>
{/*		    	  <Modal open={this.state.open}>
				    <Modal.Header>Select a Photo</Modal.Header>
				    <Modal.Content image>
				      <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
				      <Modal.Description>
				        <Header>Default Profile Image</Header>
				        <p>We've found the following gravatar image associated with your e-mail address.</p>
				        <p>Is it okay to use this photo?</p>
				      </Modal.Description>
				    </Modal.Content>
				  </Modal>*/}
		    </Comment>
		)
	}
}

export default PostRow;