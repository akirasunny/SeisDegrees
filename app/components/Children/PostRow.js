import React, { Component } from 'react'
import {
  Container, Comment, Divider, Table, Modal, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Button,
} from 'semantic-ui-react';
import moment from "moment";
import axios from "axios";
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
        this.deletePost = this.deletePost.bind(this);
	}

/*	componentWillReceiveProps(newProps) {

		this.setState({post:newProps.post,comments:newProps.post.comments});

	}*/

	activateLasers(){
		this.props.modal(this.state);
	}

	deletePost(post) {
		var postId = post.currentTarget.value;
		var isdelete = confirm("Are you sure you want to delete this post?");
		if (isdelete) {
			axios.get("/api/Delete/Post/" + postId).then(res => {
				this.props.update();
			})
		}
	}

	renderComments(){
		var comments = this.props.post.comments;
		return comments.map(function(comment,i){
			return(<PostRowComment comment={comment} key={i} modal={this.props.modal} />);
		}.bind(this))
	}

	render() {
		return (
			<Segment raised>
			    <Comment>
			      <Comment.Avatar src={this.state.img} />
			      <Comment.Content>
			        <Comment.Author as='h4'>{this.state.user}</Comment.Author>
			        <Comment.Metadata>
			          <div>{moment(this.state.date).format("MM-DD-YYYY - hh:mm a")}</div>
			        </Comment.Metadata>

			        <Table celled>
						<Table.Header>
						  <Table.Row>
						    <Table.HeaderCell><Comment.Text><Header as="h3">{this.state.title}
						    <Button size="mini" color="red" floated="right" onClick={this.deletePost} value={this.state.postId}>Delete</Button>
						    <Button size="mini" floated="right" onClick={this.props.editModal} value={this.state.postId}>Edit</Button>
						    </Header></Comment.Text></Table.HeaderCell>
						  </Table.Row>
						</Table.Header>

						<Table.Body>
						  <Table.Row>
						    <Table.Cell><Comment.Text as="p">
						     {this.state.body.split("<br />").map((data, i) => {
						    	return (
						    		<p key={i}>&ldquo;{data}&rdquo;</p>
						    	)
						    })}
						    <p>@ {this.state.location}</p>
						    </Comment.Text></Table.Cell>
						  </Table.Row>
						</Table.Body>
					</Table>
			
			        <Comment.Actions>
			          <Comment.Action onClick={this.activateLasers}>Reply</Comment.Action>
			        </Comment.Actions>
			      </Comment.Content>
			       	<Comment.Group>
			       		<Header>Comments: </Header>
			       		{this.renderComments()}
			    	</Comment.Group>
			    </Comment>
			</Segment>
		)
	}
}

export default PostRow;