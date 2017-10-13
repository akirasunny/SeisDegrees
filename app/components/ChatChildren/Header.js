import React,{ Component } from 'react';
import { Header, Image, Button, Icon } from 'semantic-ui-react';

class MsgHeader extends Component {
  render() {
    return(
      <div>
        <Header className='chat-header' size='small'>
          <Image shape='circular' size='mini' src={this.props.userInfo.pic}/>
          {this.props.userInfo.name}
          <Button floated='right' compact onClick={this.props.onClose}><Icon name='remove' fitted/></Button>
        </Header>
      </div>
    );
  }
}

export default MsgHeader;
