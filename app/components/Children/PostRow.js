import React, { Component } from 'react'
import {
  Container, Comment, Divider, Table, Modal, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
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
            date: props.post.date,
            title: props.post.title,
            body: props.post.body,
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
		this.props.modal(this.state);
	}

	renderComments(){
		var comments = this.props.post.comments;
		return comments.map(function(comment,i){
			return(<PostRowComment comment={comment} key={i} modal={this.props.modal} />);
		}.bind(this))
	}

	render() {
		return (
		    <Comment>
		      <Comment.Avatar src={this.state.img} />
		      <Comment.Content>
		        <Comment.Author as='a'>{this.state.user}</Comment.Author>
		        <Comment.Metadata>
		          <div>{this.state.date}</div>
		        </Comment.Metadata>

		        <Table celled>
					<Table.Header>
					  <Table.Row>
					    <Table.HeaderCell><Comment.Text><Header>{this.state.title}</Header></Comment.Text></Table.HeaderCell>
					  </Table.Row>
					</Table.Header>

					<Table.Body>
					  <Table.Row>
					    <Table.Cell><Comment.Text>{this.state.body}</Comment.Text></Table.Cell>
					  </Table.Row>
					</Table.Body>
				</Table>
		       
		        
		        <Comment.Text> @ {this.state.location}</Comment.Text>
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