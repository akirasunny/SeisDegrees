import React, { Component } from 'react'
import { Header, Form, Input, TextArea, Image, Button } from 'semantic-ui-react'
import ImageProfile from "./Image-profile";
import axios from "axios";

class Settings extends Component {
	constructor() {
		super();
		this.state = {
			img: ""
		};
		this.saveImage = this.saveImage.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get("/api/Users/id/" + this.props.id).then(res => {
			this.setState({
				username: res.data.username,
				email: res.data.email,
				bio: res.data.bio,
				img: this.props.img,
				gender: res.data.gender
			});
		})
	}

	saveImage(src) {
		this.setState({ img: src[0] });
	}

	handleInput(event) {
		var obj = {};
		obj[event.target.id] = event.target.value;
		this.setState(obj);
	}

	handleSubmit() {
		axios.post("/api/User/Update/" + this.props.id, this.state).then(res => {
			alert("Your profile has been updated successfully.");
			window.location = "/";
		})
	}

	render() {
		return (
		<div>
			<Header dividing>Settings</Header>
			<Form>
				<Form.Group widths="equal">
					<Form.Field control={Image} label='Profile photo' placeholder='Username'>
						<Image src={this.state.img} size="small" />
						<ImageProfile id={this.props.id} saveImage={this.saveImage}/>
					</Form.Field>
				</Form.Group>
		 		<Form.Group widths='equal'>
					<Form.Field id="username" control={Input} value={this.state.username} onChange={this.handleInput} label='Username' placeholder='Username' />
					<Form.Field control={Input} label='Email' value={this.state.email} readOnly/>
					<Form.Field label='Gender' control='select' id="gender" value={this.state.gender} onChange={this.handleInput}>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
						<option value='Female'>Secret</option>
					</Form.Field>
				</Form.Group>
				<Form.Field id="bio" control={TextArea} value={this.state.bio} onChange={this.handleInput} label='Bio' placeholder='Tell us more about you...' />
				<Button type="submit" onClick={this.handleSubmit}>Submit</Button>
			</Form>
		</div>
		)
	}
}
export default Settings;