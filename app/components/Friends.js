import React, { Component } from 'react';
import {
  Feed, Button, Header
} from 'semantic-ui-react';
import Pending from "./Pending";
import MyFriends from "./MyFriends";
import axios from "axios";


class Friends extends Component {
	constructor(props) {
		super(props);
		this.addFriend = this.addFriend.bind(this);
	}

	addFriend(user) {
		var friendid = user.currentTarget.value;
		axios.get("/api/User/" + this.props.id + "/Friend/" + friendid).then(res => {
			alert("Request has been sent, please wait for confirmation.");
			this.props.updateParent();
		});
	}

	render() {
		return (
			<Feed>
			<Header as="h3">Friends</Header>
			{this.props.pending.length !== 0 &&
				<Pending updateParent={this.props.updateParent} pending={this.props.pending} id={this.props.id} showFriends={this.props.showFriends}/>
			}
			{this.props.friends.length !== 0 &&
				<MyFriends updateParent={this.props.updateParent} friends={this.props.friends} id={this.props.id}/>
			}
			<Header as="h4">Add Friends</Header>
			{this.props.users.map((data, i) => {
				var index = this.props.requested.filter(requested => {
					return data._id === requested._id;
				});
				var index1 = this.props.pending.filter(pending => {
					return data._id === pending._id;
				})
				var friend = this.props.friends.filter(friend => {
					return data._id === friend._id
				});
				var isfriend = friend.length !== 0;
				var isrequested = index.length !== 0 || index1.length !== 0;
				var isyourself = this.props.id === data._id ? true : false;
				return (
					<Feed.Event key={i}>
						<Feed.Label>
						<img src={data.img} />
						</Feed.Label>
						<Feed.Content>
							<Feed.Summary>
								<Feed.User>{data.username}</Feed.User>
								{!isyourself && !isrequested && !isfriend && <Button size="mini" floated="right" value={data._id} onClick={this.addFriend}>Add Friend</Button>}
								{!isyourself && isrequested && <Button size="mini" disabled floated="right">Pending</Button>}
								{isyourself && <Button size="mini" floated="right" disabled>It's yourself</Button>}
								{isfriend && !isrequested && <Button size="mini" floated="right" disabled>Friends</Button>}
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

export default Friends;