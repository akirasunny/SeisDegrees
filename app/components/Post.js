import React, { Component } from 'react'
import {
  Form, TextArea, Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Button,
} from 'semantic-ui-react';
<<<<<<< HEAD
=======
import Images from "./Images";
>>>>>>> 7fcef43c7433cc174a5dbb4c8b1422d680d23e64

class Post extends Component {
	constructor() {
		super();
		this.saveImage = this.saveImage.bind(this);
		this.saveLocation = this.saveLocation.bind(this);
		this.saveDate = this.saveDate.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	saveImage(src) {
		this.setState({ img: src });
	}

	saveLocation(loc) {
		this.setState({ location: loc });
	}

	saveDate(date) {
		this.setState({ date: date });
	}

	handleInput(event) {
		var obj = {};
		obj[event.target.id] = event.target.value;
		console.log(obj);
		this.setState(obj);
	}

	componentWillMount() {
		this.setState({ id: this.props.id, username: this.props.username })
	}

	render() {
		return (
		<Container style={{ marginTop: 20 }}>
			<Form>
			<Form.Input placeholder="Title" id="title" onChange={this.handleInput}/>
			<TextArea placeholder="What's new?" id="body" onChange={this.handleInput} style={{ minHeight: 100 }} />
			</Form>
			<Container style={{ padding: 10 }}>

			<Images id={this.props.id} saveImage={this.saveImage}/>

			<Icon name="marker" size="large"/>

			<Icon name="add user" size="large"/>

			<Icon name="calendar" size="large"/>

			<Button floated="right" color="grey">Post</Button>
			</Container>
			<Container>
			{this.state.img && 
				this.state.img.map((data, i) => {
				return(
					<Image size="small" inline shape="circular" key={i} src={"/" + data} />
				)
			})}
			</Container>
		 </Container>
		)
	}
}

export default Post;