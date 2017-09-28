import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import Homeuser from "./Home-user";
import Timeline from "./Timeline";
import Locations from "./Locations";
import Friends from "./Friends";
import Logout from "./Logout";
import Post from "./Post";
import axios from "axios";

export default class StickyLayout extends Component {
  constructor() {
    super();
    this.state = {
      googleAPI:"AIzaSyBP3Xb01OSpLPBryCTei3tja3b8pU90oIg",
      menuFixed: false,
      overlayFixed: false,
      currentcard: "Home",
      timeline: [],
      locations: [],
      friends: [],
      posts: []
    };
    this.handleCard = this.handleCard.bind(this);
    this.showHome = this.showHome.bind(this);
  }

  // This function serves our purpose of running the query to geolocate.
  runGeocode(location,post) {

      /*console.log(location);*/
      /*console.log(post);*/

      // Figure out the geolocation
      //"http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + this.state.geocodeAPI
      var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + this.state.googleAPI;
      return axios.get(queryURL).then(function(response) {
          /*console.log(response);*/
          console.log(response.data.results[0].geometry.location,"/",response.data.results[0].formatted_address);
        // If get get a result, return that result's formatted address property
        if (response.data.results[0]) {
          var latLong = response.data.results[0].geometry.location;
          var unitLoc = [location,latLong.lat,latLong.lng,response.data.results[0].formatted_address,post];
          var newArray = this.state.locations.slice();
          newArray.push(unitLoc)
          this.setState({locations:newArray});
          /*console.log(this.state.locations);*/
          // console.log(typeof latLong.lat)
          /*console.log(location,response.data.results[0].geometry.location);*/
          /*console.log(unitLoc);*/
         /* this.latLongArr.push()*/
        }
        else{
          // If we don't get any results, return an empty string
          return alert("Location not found.");
        }
      }.bind(this));
  }

  componentDidMount() {
    axios.get("/api/Users/" + this.props.id).then(res => {
      this.setState({
        id: res.data._id,
        username: res.data.username
      });

      console.log(res.data.posts);
      var posts = res.data.posts;
      this.setState({posts:posts})

      posts.forEach(function(post, i) {
          /*console.log(post.location);*/
          var location = post.location;
          this.runGeocode(location,post);
      }.bind(this));
    })
  }

  showHome() {
    this.setState({ currentcard: "Home" });
  }

  handleCard(card) {
    this.setState({ currentcard: card.currentTarget.textContent });
  }

  render() {

    return (
      <div>
        {/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
        <style>{`
          html, body {
            background: #fff;
          }
        `}</style>
        
        <Segment
          inverted
          textAlign='center'
          style={{padding: '1em 0em' }}
          vertical
        >

        <Container style={{ width: "100%" }}>
          <Menu inverted style={{ paddingLeft: 100, paddingRight: 100 }}>
                {this.state.currentcard === "Home" ? <Menu.Item header onClick={this.handleCard} value="Home">Home</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Home">Home</Menu.Item>}
                {this.state.currentcard === "Timeline" ? <Menu.Item header onClick={this.handleCard} value="Timeline">Timeline</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Timeline">Timeline</Menu.Item>}
                {this.state.currentcard === "Locations"? <Menu.Item header onClick={this.handleCard} value="Locations">Locations</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Locations">Locations</Menu.Item>}
                {this.state.currentcard === "Friends" ? <Menu.Item header onClick={this.handleCard} value="Friends">Friends</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Friends">Friends</Menu.Item>}
                <Menu.Item position='right' style={{ padding: 0 }}>
                  <Logout username={this.state.username} handleLogout={this.props.handleLogout} showHome={this.showHome}/>
                </Menu.Item>
          </Menu>
        </Container>

        </Segment>

        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={7}>
              <Post id={this.props.id} username={this.props.username}/>
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
          </Grid.Row>
          
          <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10}>
            <Container style={{ minHeight: 500 }}>
            {this.state.currentcard === "Home" &&
             <Homeuser id={this.props.id} username={this.props.username}/>}
            {this.state.currentcard === "Timeline" &&
              <Timeline timeline={this.state.timeline} />}
            {this.state.currentcard === "Locations" &&
              <Locations locations={this.state.locations} />}
            {this.state.currentcard === "Friends" &&
              <Friends friends={this.state.friends} posts={this.state.posts} />}
            </Container>
            </Grid.Column>

            <Grid.Column width={3}>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Group 1' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Group 2' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Group 3' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Footer Header' />
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image src='/logo.png' centered size='mini' />
            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    )
  }
}
