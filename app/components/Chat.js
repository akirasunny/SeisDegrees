import React,{ Component } from 'react';
import MsgHeader from './ChatChildren/Header';
import Messages from './ChatChildren/Messages';
import MsgInput from './ChatChildren/Input';
import axios from "axios";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state= {
      messages: [],
      typing:''
    }
    this.onUserInputSubmit = this.onUserInputSubmit.bind(this);
  }

  componentWillMount() {
    // axios.get("/api/Users/" + this.props.names.id).then(res => {
    //   console.log(res);
    //   // this.setState({ user1: { pic: res.data.img, name: res.data.username }});
    //   axios.get("/api/Users/" + this.props.names.friendId).then(res1 => {
    //     console.log(res1);
    //     // this.setState({ user2: { pic: res1.data.img, name: res1.data.username }});
    //     axios.post("/api/Chat",{owners:[this.props.names.friendId,this.props.names.id]}).then((res2)=>{
    //       console.log(res2);
    //       socket.emit("joinRoom",{id: this.props.names.id, roomId: res.data.room});
    //       this.setState({ user1: { pic: res.data.img, name: res.data.username },user2: { pic: res1.data.img, name: res1.data.username },messages: res2.data.messages, room2: res.data.room });
    //     });
    //   });
    // });
  }

  componentDidMount() {
    axios.get("/api/Users/" + this.props.names.id).then(res => {
      console.log(res);
      // this.setState({ user1: { pic: res.data.img, name: res.data.username }});
      axios.get("/api/Users/" + this.props.names.friendId).then(res1 => {
        console.log(res1);
        // this.setState({ user2: { pic: res1.data.img, name: res1.data.username }});
        axios.post("/api/Chat",{owners:[this.props.names.friendId,this.props.names.id]}).then((res2)=>{
          console.log(res2);
          socket.emit("joinRoom",{id: this.props.names.id, roomId: res.data.room});
          this.setState({ user1: { pic: res.data.img, name: res.data.username },user2: { pic: res1.data.img, name: res1.data.username },messages: res2.data.messages, room2: res.data.room });
        });
      });
    });
    socket.on("newChat", function(data) {
      this.setState({ messages: data });
    }.bind(this));
    socket.on("typing", function(data) {
      this.setState({ typing: data });
    }.bind(this));
  }

  componentWillUnmount() {
    socket.emit("leaveRoom");
  }

  onUserInputSubmit(message) {
    // if not empty, add to DB, emit w/ message, then update messages state
    if(message.length > 0) {
      axios.post("/api/Chat/Log/"+this.state.room+"/"+this.props.names.id,{message:message}).then((newChat)=>{
        socket.emit("openOtherChat",{receiver:this.props.names.friendId,sender:this.props.names.id});
        socket.emit("chat",newChat.messages);
        this.setState({ messages: newChat.messages });
      });
    }
  }

  onType() {
    socket.emit("typing", this.state.user1.name);
  }

  render() {
    return (
      <div className='chat-window'>
        <MsgHeader userInfo={this.state.user2} onClose={this.props.closeChat}/>
        <Messages messages={this.state.messages} typing={this.state.typing}/>
        <MsgInput userInfo={this.state.user1} onSubmit={this.onUserInputSubmit} onType={this.onType}/>
      </div>
    );
  }
}

export default ChatWindow;
