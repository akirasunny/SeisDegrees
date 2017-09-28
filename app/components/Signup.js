import React, { Component } from 'react'
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react';
import axios from "axios";

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function writecookie(entry, name) {
  var expires = "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
  document.cookie = name + "=" + entry + expires;
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      switch: true,
      open: false,
      username: "",
      email: "",
      password: "",
      password1: ""
    };
    this.switch = this.switch.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  switch() {
    this.setState({ switch: !this.state.switch});
  }

  handleOpen() {
    this.setState({ open: !this.state.open });
  }

  handleInput(event) {
    var obj = {};
    obj[event.target.id] = event.target.value;
    this.setState(obj);
  }

  handleSignup() {
    if (!re.test(this.state.email)) {
      return (alert("Invalid email address."));
    }
    else if (this.state.password.length < 8) {
      return (alert("Password should be at least 8-digit long."))
    }
    else if (this.state.password !== this.state.password1) {
      return (alert("Password doesn't match."));
    }
    else {
      var state = this.state;
      var obj = {
        username: state.username,
        email: state.email,
        password: state.password
      };
      axios.post("/api/User", obj).then(res => {
        writecookie(res.data._id, "userId");
        writecookie(res.data.username, "username");
        this.props.handleLogin(res.data._id, res.data.username);
        this.handleOpen();
      });
    }
  }

  handleLog() {
    var state = this.state;
    var obj = {
      login: state.username,
      password: state.password
    };
    axios.post("/api/User/Login", obj).then(res => {
     if (!res.data) {
      return (alert("Invalid username or password."));
     }
      else {
        writecookie(res.data._id, "userId");
        writecookie(res.data.username, "username");
        this.props.handleLogin(res.data._id, res.data.username);
        this.handleOpen();
      }
    });
  }

  render() {
    return (
      <Modal open={this.state.open} trigger={<Button inverted style={{ marginLeft: '0.5em' }} onClick={this.handleOpen}>Log in / Sign Up</Button>}>
      <Icon key="close" name="close" onClick={this.handleOpen} />
        <Grid
          textAlign='center'
          style={{ height: '100%', padding: 50 }}
          verticalAlign='top'
        >
        {!this.state.switch &&
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='grey' textAlign='center'>
              {' '}Sign-up
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleInput}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  id="username"
                  required
                />
                <Form.Input
                  fluid
                  onChange={this.handleInput}
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                  id="email"
                  required
                />
                <Form.Input
                  fluid
                  onChange={this.handleInput}
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id="password"
                  required
                />
                <Form.Input
                  fluid
                  onChange={this.handleInput}
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm password'
                  type='password'
                  id="password1"
                  required
                />
                <Button color='grey' fluid size='large' onClick={this.handleSignup}>Sign up</Button>
              </Segment>
            </Form>
            <Message>
              Have an account already? <a href="#" onClick={this.switch}>Log in</a>
            </Message>
          </Grid.Column>
        }

        {this.state.switch &&
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='grey' textAlign='center'>
              Log-in
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleInput}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username / E-mail address'
                  id="username"
                />
                <Form.Input
                  onChange={this.handleInput}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id="password"
                />

                <Button color='grey' fluid size='large' onClick={this.handleLog}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#" onClick={this.switch}>Sign Up</a>
            </Message>
          </Grid.Column>
        }
        </Grid>
    </Modal>
    )
  }
}

export default Signup;
