import React, { Component } from 'react';
import {
  Container, Feed
} from 'semantic-ui-react';
import axios from "axios";

class Homeuser extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		};
	}
	
	componentWillMount() {
		axios.get("/api/Posts/User/" + this.props.id).then(res => {
			console.log(res.data);
			this.setState({ posts: res.data });
		})
	}

	render() {
		return (
			<Feed>
				{this.state.posts.map((data, i) => {
					console.log(data);
					return (
						<Feed.Event key={i}>
							<Feed.Content>
								<Feed.Summary>
									<Feed.User>{data.owner.username}</Feed.User> posted on her page.
									<Feed.Date>{data.date}</Feed.Date>
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
											<a><img key={i} src={"/" + img} /></a>
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