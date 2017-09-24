import React, { Component } from 'react'
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
} from 'semantic-ui-react'
import { Link } from 'react-router';

const Main = (props) => (
  <div>
  <Segment
    inverted
    textAlign='center'
    style={{padding: '1em 0em' }}
    vertical
  >
    <Container>
      <Menu inverted pointing secondary size='large'>
        <Link to="/"><Menu.Item as='a' active>Home</Menu.Item></Link>
        <Link to="/"><Menu.Item as='a'>Discover</Menu.Item></Link>
        <Link to="/"><Menu.Item as='a'>Notifications</Menu.Item></Link>
        <Link to="/"><Menu.Item as='a'>Messages</Menu.Item></Link>
        <Menu.Item position='right'>
          <Link to="/login"><Button as='a' inverted>Log in</Button></Link>
          <Link to="/signup"><Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button></Link>
        </Menu.Item>
      </Menu>
    </Container>
  </Segment>
        {props.children}
  </div>
)

export default Main;