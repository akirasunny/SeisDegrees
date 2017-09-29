import React,{ Component } from 'react';
import MsgHeader from './ChatChildren/Header';
import Messages from './ChatChildren/Messages';
import MsgInput from './ChatChildren/Input';
import axios from "axios";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");

class ChatWindow extends Component {
  constructor() {
    super();
    this.onUserInputSubmit = this.onUserInputSubmit.bind(this);
    this.onType = this.onType.bind(this);
  }

  onUserInputSubmit(message) {
    // if not empty, add to DB, emit w/ message, then update messages state
    this.props.inputSubmit(message);
  }

  onType() {
    this.props.onType();
  }

  render() {
    return (
      <div className='chat-window'>
        <MsgHeader userInfo={this.props.user2} onClose={this.props.chatClose}/>
        <Messages messages={this.props.messages} typing={this.props.typing}/>
        <MsgInput userInfo={this.props.user1} onSubmit={this.onUserInputSubmit} onType={this.onType}/>
      </div>
    );
  }
}

export default ChatWindow;
