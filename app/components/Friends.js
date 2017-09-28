import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Comment, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import PostRow from "./Children/PostRow";

class Friends extends Component {
	constructor(props) {
		super(props);
		this.state = {
            posts: props.posts
        };
	}
/*
	componentDidMount(){
		console.log(this.state.posts);
	}
*/
	populatePosts(){
		var posts = this.state.posts;
		return posts.map(function(post,i){
			return(<PostRow post={post} key={i} />);
		})
	}

	render() {
		return (
			<Comment.Group size="large">
				<Header as='h3' dividing>My Posts</Header>
				{this.populatePosts()}
			</Comment.Group>
		)
	}
}

export default Friends;