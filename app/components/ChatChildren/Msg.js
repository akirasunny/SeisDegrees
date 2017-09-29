import React, { Component } from "react";

class Msg extends Component {
  render() {
    return (
      <div className="message">
          <strong>{this.props.user}: </strong>
          <span>{this.props.message}</span>
      </div>
    );
  }
}

export default Msg;
