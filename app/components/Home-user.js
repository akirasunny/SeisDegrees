import React, { Component } from 'react';
import {
  Container, Feed, Button
} from 'semantic-ui-react';
import axios from "axios";
import moment from "moment";

class Homeuser extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			open: false
		};
	}
	
/*	componentWillMount() {
	axios.get("/api/Users/" + this.props.id).then(res => {
			var postsId = res.data.posts.map(data => {
				return data._id;
			});
			for (var i = 0; i < res.data.friends.length; i++) {
				for (var j = 0; j < res.data.friends[i].posts.length; j++) {
					postsId.push(res.data.friends[i].posts[j]);
				}
			}
			axios.post("/api/Posts", {array: postsId}).then(posts => {
				this.setState({ posts: posts.data });		
			});
		})
		this.props.update();
	}
*/
	render() {
		return (
			<Feed>
				{this.props.posts.map((data, i) => {
					var isyourself = data.owner._id === this.props.id;
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
								<Feed.Summary>
									{data.title}
								</Feed.Summary>
								<Feed.Extra text>
									{data.body.split("<br />").map( (data, i) => {
										return(
											<p key={i}>{data}</p>
										)
									})}
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