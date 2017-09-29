import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility, Sidebar
} from 'semantic-ui-react';
import Homeuser from "./Home-user";
import Timeline from "./Timeline";
import Locations from "./Locations";
import Friends from "./Friends";
import Logout from "./Logout";
import Post from "./Post";
import ChatWindow from './Chat';
import MyPosts from "./MyPosts";
import Settings from "./Settings";
import axios from "axios";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");

export default class StickyLayout extends Component {
  constructor() {
    super();
    this.state = {
      googleAPI:"AIzaSyBP3Xb01OSpLPBryCTei3tja3b8pU90oIg",
      currentcard: "Home",
      visible: true,
      locations:[],
      posts:[],
      chatOpen: false,
      online:[]
    };
    this.handleCard = this.handleCard.bind(this);
    this.showHome = this.showHome.bind(this);
    this.chatClose = this.chatClose.bind(this);
    this.openChatWindow = this.openChatWindow.bind(this);
    this.showFriends = this.showFriends.bind(this);
    this.updateParent = this.updateParent.bind(this);
    this.inputSubmit = this.inputSubmit.bind(this);
    this.onType = this.onType.bind(this);
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
    this.updateParent();
    socket.on("userJoined", function(data) {
      axios.get("/api/Users/" + data.id).then((res) => {
          var filter = this.state.friends.filter((obj)=>{
            return obj._id == data.id;
          });
          var filt2 = this.state.online.filter((obj)=>{
            return obj._id == res.data._id;
          });
          console.log(res.data);
          if(filter.length !== 0 && filt2.length == 0){
            this.setState({ online: this.state.online.concat(res.data)});
          }
      });
    }.bind(this));
    socket.on("userLeft", function(data) {
        var result = this.state.online.filter(function( obj ) {
          return obj._id !== data.id;
        });
        this.setState({ online: result });
    }.bind(this));
    socket.on("tryingToJoin", function(data) {
      if(this.state.id == data.receiver) {
        this.openChatWindow(data.sender);
      }
    }.bind(this));
    window.onbeforeunload = (e)=>{
      e.preventDefault();
      alert('why?');
      axios.post("/api/User/Update/"+this.props.id,{online:false}).then(()=>{
        socket.emit("disconnect",{id: this.props.id});
      });
    };
    socket.on("typing", function(data) {
      this.setState({ typing: data });
    }.bind(this));
  }

  componentWillUnmount() {
    console.log('unmounting profile');
    axios.post("/api/User/Update/"+this.props.id,{online:false}).then(()=>{
      socket.emit("disconnect",{id: this.props.id});
    });
  }

  updateParent() {
    axios.get("/api/Users/" + this.props.id).then(res => {
      this.setState({
        id: res.data._id,
        username: res.data.username,
        img: res.data.img,
        requested: res.data.requested || [],
        pending: res.data.pending || [],
        friends: res.data.friends || []
      });
      res.data.friends.forEach(function(friend, i) {
        if(friend.online) {
          this.setState({ online: this.state.online.concat(friend) });
        }
      }.bind(this));
      axios.get("/api/Users").then(res1 => {
        this.setState({ users: res1.data });
        var posts = res.data.posts;
        this.setState({posts:posts})

        posts.forEach(function(post, i) {
            /*console.log(post.location);*/
            var location = post.location;
            this.runGeocode(location,post);
        }.bind(this));
      });
    });
  }

  showHome() {
    this.setState({ currentcard: "Home" });
  }

  showFriends() {
    this.setState({ currentcard: "Friends" });
  }

  handleCard(card) {
    this.setState({ currentcard: card.currentTarget.textContent });
    console.log(this.state.currentcard);
  }

  chatClose() {
    socket.emit("leaveRoom");
    this.setState({ chatOpen: false, friendId:'' });
  }

  inputSubmit(message) {
    if(message.length > 0) {
      axios.post("/api/Chat/Log/"+this.state.room+"/"+this.state.username,{message:message}).then((newChat)=>{
        console.log(newChat);
        socket.emit("openOtherChat",{receiver:this.state.friendId,sender:this.state.id});
        // socket.emit("chat",newChat.messages);
        this.setState({ messages: this.state.messages.concat(newChat.data) });
      });
    }
  }

  openChatWindow(friendId) {
    axios.get("/api/Users/" + this.state.id).then(res => {
      console.log(res);
      // this.setState({ user1: { pic: res.data.img, name: res.data.username }});
      axios.get("/api/Users/" + friendId).then(res1 => {
        console.log(res1);
        // this.setState({ user2: { pic: res1.data.img, name: res1.data.username }});
        axios.post("/api/Chat",{owners:[friendId,this.state.id]}).then((res2)=>{
          console.log(res2);
          socket.emit("joinRoom",{id: this.state.id, roomId: res2.data.room});
          this.setState({ user1: { pic: res.data.img, name: res.data.username },user2: { pic: res1.data.img, name: res1.data.username },messages: res2.data.messages, room: res2.data.room, friendId: friendId, typing: '',chatOpen: true });
        });
      });
    });
  }

  onType() {
    socket.emit("typing", this.state.user1.name);
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

        <Sidebar.Pushable as={Segment}>
         <Sidebar
           as={List}
           animation='overlay'
           width='thin'
           direction='right'
           visible={this.state.visible}
           icon='labeled'
           divided
           relaxed
         >
           <Header inverted size='small' color='blue'><Icon name='users'/> Online Friends </Header>
           {
             this.state.online.map((friend,i)=>{
               var friendId = friend._id;
               return(
                 <List.Item value={friendId} onClick={()=>this.openChatWindow(friendId)} key={i}>
                   <Image src={friend.img} size='mini' shape='circular' />
                   <List.Content>
                     <List.Header>{friend.username}</List.Header>
                     <List.Description><Icon name='circle' color='green' />Online</List.Description>
                   </List.Content>
                 </List.Item>
               );
             })
           }
         </Sidebar>
         <Sidebar.Pusher>
           <Segment
             inverted
             textAlign='center'
             style={{padding: '0' }}
             vertical
           >

              <Container style={{ width: "100%" }}>
                <Menu inverted style={{ paddingLeft: 20, paddingRight: 190 }}>
                      {this.state.currentcard === "Home" ? <Menu.Item header onClick={this.handleCard} value="Home">Home</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Home">Home</Menu.Item>}
                      {this.state.currentcard === "Timeline" ? <Menu.Item header onClick={this.handleCard} value="Timeline">Timeline</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Timeline">Timeline</Menu.Item>}
                      {this.state.currentcard === "Locations"? <Menu.Item header onClick={this.handleCard} value="Locations">Locations</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Locations">Locations</Menu.Item>}
                      {this.state.currentcard === "Friends" ? <Menu.Item header onClick={this.handleCard} value="Friends">Friends</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Friends">Friends</Menu.Item>}
                      {this.state.currentcard === "My Posts" ? <Menu.Item header onClick={this.handleCard} value="Posts">My Posts</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Posts">My Posts</Menu.Item>}
                      {this.state.currentcard === "Settings" ? <Menu.Item header onClick={this.handleCard} value="Settings">Settings</Menu.Item> : <Menu.Item onClick={this.handleCard} value="Settings">Settings</Menu.Item>}
                      <Menu.Item position='right' style={{ padding: 0 }}>
                        <Logout username={this.state.username} id={this.state.id} handleLogout={this.props.handleLogout} showHome={this.showHome} img={this.state.img}/>
                      </Menu.Item>
                </Menu>
              </Container>

           </Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Post id={this.props.id} username={this.props.username} showHome={this.showHome}/>
                </Grid.Column>
                <Grid.Column width={6}>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={7}>
                <Container style={{ minHeight: 500 }}>
                {this.state.currentcard === "Home" &&
                  <Homeuser id={this.props.id} username={this.props.username} />}
                {this.state.currentcard === "Timeline" &&
                  <Timeline />}
                {this.state.currentcard === "Locations" &&
                  <Locations locations={this.state.locations} />}
                {this.state.currentcard === "Friends" &&
                  <Friends
                    updateParent={this.updateParent}
                    showFriends={this.showFriends}
                    id={this.props.id}
                    username={this.props.username}
                    requested={this.state.requested}
                    pending={this.state.pending}
                    friends={this.state.friends}
                    users={this.state.users}/>}
                {this.state.currentcard === "My Posts" &&
                  <MyPosts posts={this.state.posts} update={this.updateParent} />}
                {this.state.currentcard === "Settings" &&
                  <Settings showHome={this.showHome} id={this.props.id} username={this.props.username} img={this.state.img}/>}

                </Container>
                </Grid.Column>

                <Grid.Column width={3}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {this.state.chatOpen &&
              <ChatWindow
                messages={this.state.messages}
                user1={this.state.user1}
                user2={this.state.user2}
                chatClose = {this.chatClose}
                inputSubmit = {this.inputSubmit}
                onType = {this.onType}
                typing={this.state.typing}
              />
            }
         </Sidebar.Pusher>
       </Sidebar.Pushable>

        <Segment
          inverted
          style={{ margin: '0em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Javier Avitia' />
                  <List link inverted>
                    <List.Item>Full-Stack Developer</List.Item>
                    <List.Item><Image size="small" shape="circular" src="../../public/assets/ProfileImages/javier.png"/></List.Item>
                    <List.Item>GitHub: <a href="https://github.com/Gr8ChairmanMeow">Gr8ChairmanMeow</a></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Hao Su' />
                  <List link inverted>
                    <List.Item>Full-Stack Developer</List.Item>
                    <List.Item><Image size="small" shape="circular" src="../../public/assets/ProfileImages/hao.jpg"/></List.Item>
                    <List.Item>GitHub: <a href="https://github.com/akirasunny">akirasunny</a></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Stephen Woo' />
                  <List link inverted>
                    <List.Item>Full-Stack Developer</List.Item>
                    <List.Item><Image size="small" shape="circular" src="../../public/assets/ProfileImages/stephen.png"/></List.Item>
                    <List.Item>GitHub: <a href="https://github.com/stephenwoo95">stephenwoo95</a></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Acknowledgements' />
                  <p>Clark Nielsen</p>
                  <p>Paige Pittman</p>
                  <p>Josh Apstein</p>
                  <p>UCLA Extension Coding Bootcamp (Full-Time) - July, 2017</p>
                  <p>Semantic UI</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image src='/logo.png' centered size='mini' />
            <List horizontal inverted divided link>
              <List.Item as='a' href='https://github.com/akirasunny/diary'>GitHub Repository</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    )
  }
}
