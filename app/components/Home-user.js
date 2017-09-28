import React, { Component } from 'react';
import {
  Container, Feed
} from 'semantic-ui-react';
import axios from "axios";
import moment from "moment";

class Homeuser extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		};
	}
	
	componentWillMount() {

	axios.get("/api/Users/" + this.props.id).then(res => {
			console.log(res.data.posts);
			this.setState({ posts: res.data.posts });
		})
	}

	render() {
		return (
			<Feed>
				{this.state.posts.map((data, i) => {
					var gender = data.owner.gender === "Female" ? "her" : "his";
					return (
						<Feed.Event key={i}>
						<Feed.Label>
						<img src={data.owner.img} />
						</Feed.Label>
							<Feed.Content>
								<Feed.Summary>
									<Feed.User>{data.owner.username}</Feed.User> posted on {gender} page.
									<Feed.Date>{moment(data.date).format("HH:mm  MM-DD-YYYY")}</Feed.Date>
								</Feed.Summary>
								<Feed.Extra text>
									{data.title}
								</Feed.Extra>
								<Feed.Extra text>
									{data.body}
								</Feed.Extra>
								<Feed.Extra images>
									{data.img.map((img, i) => {
										return (
											<img key={i} src={img} />
										)
									})}
								</Feed.Extra>
							</Feed.Content>
						</Feed.Event>
					)
				})}

			</Feed>
		)
	}
}

export default Homeuser;