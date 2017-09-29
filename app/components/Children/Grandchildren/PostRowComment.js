import React, { Component } from 'react'
import {
  Container, Comment, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';

class PostRowComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.comment._id,
            body: props.comment.body,
            user: props.comment.owner.username,
            userId: props.comment.owner._id,
            img: props.comment.owner.img
        };
        // this.activateLasers = this.activateLasers.bind(this);
	}

/*	activateLasers(){
		this.props.update();
		this.props.modal(this.state);
	}*/

	render() {
		return (
	        <Comment>
	          <Comment.Avatar src={this.state.img} />
	          <Comment.Content>
	            <Comment.Author as='a'>{this.state.user}</Comment.Author>
	            <Comment.Metadata>
	              <div>Just now</div>
	            </Comment.Metadata>
	            <Comment.Text>
	              {this.state.body}
	            </Comment.Text>
{/*	            <Comment.Actions>
	              <Comment.Action onClick={this.activateLasers}>Reply</Comment.Action>
	            </Comment.Actions>*/}
	          </Comment.Content>
	        </Comment>
		)
	}
}

export default PostRowComment;