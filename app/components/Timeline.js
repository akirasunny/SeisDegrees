import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
var ReactLifeTimeline = require('react-life-timeline');

class Timeline extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
        <ReactLifeTimeline events={this.props.timeline}></ReactLifeTimeline>
			</div>
		)
	}
}

export default Timeline;
