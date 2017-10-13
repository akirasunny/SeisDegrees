import React,{ Component } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';


class MsgInput extends Component {
  constructor() {
    super();
    this.state={
      input: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.props.onType();
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ input:'' });
    this.props.onSubmit(this.state.input);
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field inline className='msg-input'>
          <label className='chat-send-pic'><Image size='mini' shape='circular' src={this.props.userInfo.pic} /></label>
          <Form.Input className='chat-input' placeholder='Write a message...' value={this.state.input} onChange={this.handleInputChange}/>
          <Form.Button className='msg-send-btn' circular icon='send' size='mini' compact />
        </Form.Field>
      </Form>
    );
  }
}

export default MsgInput;
