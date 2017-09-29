import React,{ Component } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';


class MsgInput extends Component {
  constructor() {
    super();
    this.state={
      input: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event,{ name, value }) {
    this.props.onType();
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.input);
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field inline>
          <label><Image size='mini' shape='circular' src={this.props.userInfo.pic} /></label>
          <Form.Input placeholder='Write a message...' name='input' value={input} onChange={this.handleInputChange}/>
          <Form.Button circular icon='send' />
        </Form.Field>
      </Form>
    );
  }
}

export default MsgInput;
