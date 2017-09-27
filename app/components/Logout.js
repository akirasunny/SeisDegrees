import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router';

class Logout extends Component {
	render() {
		return (
			<Menu.Item style={{ marginTop: 0, padding: 0 }}>
				<Menu.Item onClick={this.props.showHome}>Hi, {this.props.username}!</Menu.Item>
				<Button inverted onClick={this.props.handleLogout}>Log out</Button>
			</Menu.Item>
		)
	}
}

export default Logout;