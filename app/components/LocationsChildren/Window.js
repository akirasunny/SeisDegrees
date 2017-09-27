import React, { Component } from 'react'

class Window extends Component {
	constructor(props) {
		super(props);
        this.state = {
            info: props.location
        };
	}
	render() {
		return (
			<div>
				{this.state.info[0]}
			</div>
		)
	}
}

export default Window;