import React,{ Component } from 'react';
import Header from './ChatChildren/Header';
import Messages from './ChatChildren/Messages';
import Input from './ChatChildren/Input';
import axios from "axios";

class ChatWindow extends Component {
  constructor() {
    super();
    this.state= {
      messsages: []
    }
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount() {
    axios.get("/api/Users/" + this.props.names.id).then(res => {
      this.setState({ user1: { pic: res.img, name: res.username }});
    });

    axios.get("/api/Users/" + this.props.names.friendId).then(res => {
      this.setState({ user2: { pic: res.img, name: res.username }});
    });

    axios.get("/api/Chat/" + this.props.names.id + '/' + this.props.names.friendId).then(res => {
      this.setState({ messages: res.messages });
    });
  }

  onUserInputSubmit(message) {
    this.props.onUserInputSubmit(message);
  }

  onMessageReceived(message) {
    this.setState({ messages: this.state.messages.concat(message)});
  }

  render() {
    return (
      <div className='chat-window'>
        <Header userInfo={this.state.user2} onClose={this.props.closeChat}/>
        <Messages messages={this.state.messages}/>
        <Input userInfo={this.state.user1} onSubmit={this.onUserInputSubmit} />
      </div>
    );
  }
}

export default ChatWindow;
