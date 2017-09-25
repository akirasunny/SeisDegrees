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
import Login from "./Login";
import Signup from "./Signup"

const Main = (props) => (
  <div>
        {props.children}
  </div>
)

export default Main;