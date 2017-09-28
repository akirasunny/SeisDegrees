import React, { Component } from 'react'
import {
  Container, Comment, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import PostRowComment from "./Grandchildren/PostRowComment";

class PostRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
            post: props.post,
            user: props.post.owner.username,
            img: props.post.owner.img,
            location: props.post.location,
            comments: props.post.comments
        };
	}

	componentDidMount(){
		console.log("Hey!",this.state.post);
	}

	activateLasers(){
		console.log("PEW! PEW!");
	}

	renderComments(){
		var comments = this.state.comments;
		return comments.map(function(comment,i){
			return(<PostRowComment comment={comment} key={i} activateLasers={this.activateLasers} />);
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
		    </Comment>
		)
	}
}

export default PostRow;