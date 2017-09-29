import React,{ Component } from 'react';
import Msg from "./Msg";

class Messages extends Component {
  render() {
    var type = (this.props.typing!=='');
    return(
      <div className='messages'>
          {
              this.props.messages.map((message, i) => {
                  return (
                      <Msg
                          key={i}
                          user={message.user}
                          message={message.message}
                      />
                  );
              })
          }
          {type &&
          <div className='typing'>`${this.props.typing} is typing...`</div>}
      </div>
    );
  }
}

export default Messages;
