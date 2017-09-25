import React, { Component } from 'react'
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react';
import Signup from "./Signup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      switch: false
    };
    this.switch = this.switch.bind(this);
  }
  switch() {
    this.setState({ switch: !this.state.switch});
  }
  render() {
    return (
      <Modal trigger={<Button as='a' inverted onClick={this.switch}>Log in</Button>}>
        <Grid
          textAlign='center'
          style={{ padding: 50}}
          verticalAlign='top'
        >
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

                <Button color='grey' fluid size='large' onClick={this.switch}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#" onClick={this.switch}>Sign Up</a>
            </Message>
          </Grid.Column>
        }

        {!this.state.switch && 
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='grey' textAlign='center'>
              {' '}Sign-up
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                />
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm password'
                  type='password'
                />
                <Button color='grey' fluid size='large'>Sign up</Button>
              </Segment>
            </Form>
            <Message>
              Have an account already? <a href="#" onClick={this.switch}>Log in</a>
            </Message>
          </Grid.Column>
        }
        </Grid>
      </Modal>
    )
  }
}

export default Login;