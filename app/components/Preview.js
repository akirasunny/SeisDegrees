import React, { Component } from 'react';
import { Image, Header, Container, Button } from 'semantic-ui-react';
import axios from "axios";

class Preview extends Component {
	constructor(props) {
		super(props);
		this.saveAndClose = this.saveAndClose.bind(this);
	}

	saveAndClose() {
		this.props.saveImage(this.props.src);
		this.props.handleOpen();
	}

	render() {
		return (
			<Container style={{ margin: 20 }}>
				<Header size='small'>Preview</Header>
				{this.props.src.map(function(data, i) {
					return(
						<Image size="small" inline shape="circular" key={i} src={"/" + data} />
					)
				})}
				<br />
				<Button type="submit" onClick={this.saveAndClose}>Confirm</Button>
			</Container>
		)
	}
}

export default Preview;