import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react';
import axios from "axios";
import Preview from "./Preview";

var init = true;

class Images extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handlePreview = this.handlePreview.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	handleOpen() {
		this.setState({ open: !this.state.open });
	}

	handleUpload(event) {
		this.setState({ image: event.target.files });
	}

	handlePreview() {
		if (!init) {
			this.setState({ src: [] });
		}
		var files = this.state.image;
		var data = new FormData();
		for (var i = 0; i < files.length; i++) {
			data.append("Images" + i, files[i]);
		}
		axios.post("/api/Post/pic/" + this.props.id, data).then(res => {
			this.setState({ src: res.data });
			init = false;
		})
	}

	render() {
		return (
			<Modal
				open={this.state.open} 
				style={{ minHeight: 300, width: "70%", padding: 20 }} 
				trigger={<Icon name="photo" size="large" onClick={this.handleOpen}/>}
			>
			<Header size='small'>Add pictures for your footprint.</Header>
			<Header size='tiny'>You can upload up to 4 images, jpg, png & gif supported.</Header>
			<Icon key="close" name="close" onClick={this.handleOpen} />
				<Form>
					<Form.Input type="file" multiple onChange={this.handleUpload} id="image"/>
					<Button type="submit" onClick={this.handlePreview}>Upload</Button>
				</Form>
			{this.state.src &&
				<Preview src={this.state.src} saveImage={this.props.saveImage} handleOpen={this.handleOpen}/>}
			</Modal>
		)
	}
}

export default Images;