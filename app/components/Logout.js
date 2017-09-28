import React, { Component } from 'react'
import { Menu, Button, Image } from 'semantic-ui-react';
import axios from "axios";

class Logout extends Component {
  constructor() {
    super();
  }

	render() {
		return (
			<Menu.Item style={{ marginTop: 0, padding: 0 }}>
        <Menu.Item style={{ padding: 0}}><img src={this.props.img} /></Menu.Item>
				<Menu.Item onClick={this.props.showHome}>Hi, {this.props.username}!</Menu.Item>
				<Button inverted onClick={this.props.handleLogout}>Log out</Button>
			</Menu.Item>
		)
	}
}

export default Logout;