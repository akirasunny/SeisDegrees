import React,{ Component } from 'react';
import { Header, Image, Button, Icon } from 'semantic-ui-react';

class MsgHeader extends Component {
  render() {
    return(
      <div>
        <Header size='h6'>
          <Image shape='circular' size='mini' src={this.props.userInfo.pic}/>
          {this.props.userInfo.name}
        </Header>
        <Button floated='right' compact onClick={this.props.onClose}><Icon name='remove' fitted/></Button>
      </div>
    );
  }
}

export default MsgHeader;
