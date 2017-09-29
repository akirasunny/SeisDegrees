import React,{ Component } from 'react';
import Msg from "./Msg";

class Messages extends Component {
  render() {
    var type = (this.props.typing!=='');
    var map;
    console.log(this.props.messages);
    if (this.props.messages.length !== 0) {
      map = this.props.messages.map((message, i) => {
          return (
              <Msg
                  key={i}
                  user={message.user}
                  message={message.message}
              />
          );
      })
    } else {
      map = '';
    }
    return(
      <div className='messages'>
          {map}
          {type &&
          <div className='typing'>{this.props.typing} is typing...</div>}
      </div>
    );
  }
}

export default Messages;
