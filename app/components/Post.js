import React, { Component } from 'react'
import {
  Form, TextArea, Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Button,
} from 'semantic-ui-react';

class Post extends Component {
	constructor() {
		super();
	}
	
	componentWillMount() {

	}

	render() {
		return (
		<Container style={{ marginTop: 20 }}>
			<Form>
			<Form.Input placeholder="Title" id="title"/>
			<TextArea placeholder="What's new?" id="body" style={{ minHeight: 100 }} />
			</Form>
			<Container style={{ padding: 10 }}>

			<Icon name="photo" size="large"/>
			
			<Icon name="marker" size="large"/>

			<Icon name="add user" size="large"/>

			<Button floated="right" color="grey">Post</Button>
			</Container>
		 </Container>
		)
	}
}

export default Post;