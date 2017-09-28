import React, { Component } from 'react';
import {
  Feed, Button, Header
} from 'semantic-ui-react';
import axios from "axios";

class Pending extends Component {
	constructor() {
		super();

		this.confirmFriend = this.confirmFriend.bind(this);
		this.dissmissFriend = this.dissmissFriend.bind(this);
	}

	confirmFriend(user) {
		var friendid = user.currentTarget.value;
		axios.get("/api/" + this.props.id + "/Accept/" + friendid).then(res => {
			alert("Friend request confirmed.");
			this.props.updateParent();
		})
	}

	dissmissFriend(user) {
		var friendid = user.currentTarget.value;
		axios.get("/api/" + this.props.id + "/Reject/" + friendid).then(res => {
			alert("Friend request dismissed.");
			this.props.updateParent();
		})
	}
	render() {
		return(
			<Feed>
			<Header as="h4">Pending Requests</Header>
			{this.props.pending.map((data, i) => {
				return (
					<Feed.Event key={i}>
						<Feed.Label>
						<img src={data.img} />
						</Feed.Label>
						<Feed.Content>
							<Feed.Summary>
								<Feed.User>{data.username}</Feed.User>
								<Button size="mini" floated="right" value={data._id} onClick={this.dissmissFriend}>Dismiss</Button>
								<Button size="mini" floated="right" value={data._id} onClick={this.confirmFriend}>Confirm</Button>
							</Feed.Summary>
							<Feed.Extra text>
								{data.bio}
							</Feed.Extra>
						</Feed.Content>
					</Feed.Event>
				)
			})}
			</Feed>
		)
	}
}

export default Pending;