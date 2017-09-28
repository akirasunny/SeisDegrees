import React, { Component } from 'react';
import {
  Feed, Button, Header
} from 'semantic-ui-react';
import axios from "axios";
import RemoveFriend from "./RemoveFriend";

class MyFriends extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Feed style={{ maxHeight: 300}}>
			<Header as="h4">My Friends</Header>
			{this.props.friends.map((data, i) => {
				return (
					<Feed.Event key={i}>
						<Feed.Label>
						<img src={data.img} />
						</Feed.Label>
						<Feed.Content>
							<Feed.Summary>
								<Feed.User>{data.username}</Feed.User>
								<RemoveFriend updateParent={this.props.updateParent} friendId={data._id} friendName={data.username} id={this.props.id}/>
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

export default MyFriends;