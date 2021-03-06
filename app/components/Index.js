import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router';
import Signup from "./Signup";
import Home from "./Home";
import Profile from "./Profile";
import Logout from "./Logout";
import axios from "axios";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");

const FixedMenu = () => (
  <Menu inverted fixed='top' size='large'>
    <Container>
        <Link to="/"><Menu.Item>Home</Menu.Item></Link>
        <Link to="/"><Menu.Item>Discover</Menu.Item></Link>
        <Link to="/"><Menu.Item>Notifications</Menu.Item></Link>
        <Link to="/"><Menu.Item>Messages</Menu.Item></Link>
    </Container>
  </Menu>
)

class Index extends Component {
  constructor() {
    super();
    this.state = {
      page: "Home"
    };
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if (document.cookie) {
      var array = document.cookie.split(";").map(function(data) {
        return data.substring(data.indexOf("=") + 1);
      });
      this.setState({ login: array[0], username: array[1], page: "Profile" });
      axios.post("/api/User/Update/"+array[0],{online:true}).then(()=>{
        socket.emit("signIn",{id: array[0], username: array[1]});
      });
    }
  }

  handleLogin(userid, username) {
    this.setState({ login: userid, username: username, page: "Profile" });
    axios.post("/api/User/Update/"+userid,{online:true}).then(()=>{
      socket.emit("signIn",{id: userid, username: username});
    });
  }

  handleLogout() {
    delete this.state.login;
    delete this.state.username;
    document.cookie = "userId=''; expires=Thu, 18 Dec 2002 12:00:00 UTC";
    document.cookie = "username=''; expires=Thu, 18 Dec 2002 12:00:00 UTC";
    this.setState({ page: "Home"});
  }

  handlePage(page) {
    this.setState({ page: page.currentTarget.textContent})
  }

  hideFixedMenu() {
    this.setState({ visible: false })
  }

  showFixedMenu() {
    this.setState({ visible: true })
  }
  render() {
    const { visible } = this.state;
    return (
      <div>
        {(this.state.login && this.state.page === "Profile") ?
        <Profile id={this.state.login} username={this.state.username} handleLogout={this.handleLogout} /> :
          <div>
          { visible ? <FixedMenu /> : null }

          <Visibility
            onBottomPassed={this.showFixedMenu}
            onBottomVisible={this.hideFixedMenu}
            once={false}
          >
          <Segment
            inverted
            textAlign='center'
            style={{padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                {this.state.page === "Home" ? <Link to="/"><Menu.Item active onClick={this.handlePage}>Home</Menu.Item></Link> : <Link to="/"><Menu.Item onClick={this.handlePage}>Home</Menu.Item></Link>}
                {this.state.page === "Discover" ? <Link to="/"><Menu.Item active onClick={this.handlePage}>Discover</Menu.Item></Link> : <Link to="/"><Menu.Item onClick={this.handlePage}>Discover</Menu.Item></Link>}
                {this.state.page === "Notifications" ? <Link to="/"><Menu.Item active onClick={this.handlePage}>Notifications</Menu.Item></Link> : <Link to="/"><Menu.Item onClick={this.handlePage}>Notifications</Menu.Item></Link>}
                {this.state.page === "Messages" ? <Link to="/"><Menu.Item active onClick={this.handlePage}>Messages</Menu.Item></Link> : <Link to="/"><Menu.Item onClick={this.handlePage}>Messages</Menu.Item></Link>}
                <Menu.Item position='right'>
                    {!this.state.login &&
                      <Signup handleLogin={this.handleLogin} />
                    }
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          </Visibility>
          {this.state.page === "Home" && <Home />}
          </div>
        }
      </div>
    )
  }
}

export default Index;
