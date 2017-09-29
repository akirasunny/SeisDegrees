import React, { Component } from 'react'
import {
  Form, TextArea, Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Button,
} from 'semantic-ui-react';
import Images from "./Images";
import axios from "axios";

class Post extends Component {
	constructor() {
		super();
		this.saveImage = this.saveImage.bind(this);
		this.saveDate = this.saveDate.bind(this);
		this.saveTagged = this.saveTagged.bind(this);
		this.createPost = this.createPost.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	saveImage(src) {
		this.setState({ img: src });
	}

	saveDate(date) {
		this.setState({ date: date });
	}

	saveTagged(tagged) {
		this.setState({ tagged: person });
	}

	handleInput(event) {
		var obj = {};
		obj[event.target.id] = event.target.value;
		this.setState(obj);
	}

	createPost() {
		var state = this.state;
		var obj = {
			title: state.title,
			body: state.body.replace(/\n/g,"<br />"),
			img: state.img,
			location: state.location,
			date: state.date,
			owner: state.id,
			tagged: state.tagged
		};
		axios.post("/api/Post", obj).then(res => {
			this.setState({
				title: "",
				body: "",
				img: [],
				location: "",
				date: ""
			});
			this.props.update();
			document.getElementById("postForm").reset();
		})
	}

	componentWillMount() {
		this.setState({ id: this.props.id, username: this.props.username })
	}

	render() {
		return (
		<Container style={{ marginTop: 20 }}>
			<Form id="postForm">
			<Form.Input placeholder="Title" id="title" onChange={this.handleInput} required/>
			<Form.Input placeholder="Location" id="location" onChange={this.handleInput} required/>
			<TextArea placeholder="What's new?" id="body" onChange={this.handleInput} required style={{ minHeight: 100 }} />
			</Form>
			<Container style={{ padding: 10 }}>

			<Images id={this.props.id} saveImage={this.saveImage}/>

			<Icon name="add user" size="large"/>

			<Button floated="right" color="grey" onClick={this.createPost}>Post</Button>
			</Container>
			<Container>
			{this.state.img && 
				this.state.img.map((data, i) => {
				return(
					<Image size="small" inline key={i} src={data} />
				)
			})}
			</Container>
		 </Container>
		)
	}
}

export default Post;