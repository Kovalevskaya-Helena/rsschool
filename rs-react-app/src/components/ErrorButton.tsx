import React, { Component } from 'react';
import './errorbutton.css';

export class ErrorButton extends Component {
  infos = [];
  state = { infoIndex: undefined };

  onClick = () => {
    this.setState({ infoIndex: 1 });
  };

  render() {
    const info = this.state.infoIndex
      ? this.infos[this.state.infoIndex].toLowerCase()
      : '';
    return (
      <button className="error-button" type="button" onClick={this.onClick}>
        {`Error button${info}`}
      </button>
    );
  }
}
