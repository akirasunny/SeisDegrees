import React, { Component } from 'react'
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react';
import axios from "axios";

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      switch: false,
      username: "",
      email: "",
      password: "",
      password1: ""
    };
    this.switch = this.switch.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLog = this.handleLog.bind(this);
  }

  switch() {
    this.setState({ switch: !this.state.switch});
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
        this.props.handleLogin();
        console.log(res);
        localStorage.setItem("userid", res._id);
      });
    }
  }

  handleLog() {

  }

  render() {
    return (
      <Modal trigger={<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>}>
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
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username / E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
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