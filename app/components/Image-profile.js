import React, { Component } from 'react';
import { Button, Form, Header, Image, Modal, Icon } from 'semantic-ui-react';
import axios from "axios";
import Preview from "./Preview";

var init = true;

class ImageProfile extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		}

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
		var file = this.state.image[0];
		var data = new FormData();
		data.append("Image", file);
		console.log(data);
		axios.post("/api/Post/pic/" + this.props.id, data).then(res => {
			this.setState({ src: res.data });
			init = false;
		})
	}

	render() {
		return(
			<Modal
				open={this.state.open} 
				style={{ minHeight: 300, width: "70%", padding: 20 }} 
				trigger={<Button onClick={this.handleOpen}>Update profile photo</Button>}
			>
				<Header size='small'>Update your profile photo.</Header>
				<Header size='tiny'>jpg, png & gif supported.</Header>
				<Icon key="close" name="close" onClick={this.handleOpen} />
				<Form>
					<Form.Input type="file" onChange={this.handleUpload} id="image"/>
					<Button type="submit" onClick={this.handlePreview}>Upload</Button>
				</Form>
				{this.state.src &&
					<Preview src={this.state.src} saveImage={this.props.saveImage} handleOpen={this.handleOpen}/>}
			</Modal>
		)
	}

}

export default ImageProfile;