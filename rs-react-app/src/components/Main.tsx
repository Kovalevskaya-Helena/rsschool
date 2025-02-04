import React, { Component } from 'react';
import { List } from './List';
import './main.css';

export class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <header className="main-header">Results</header>
        <div className="main-box">
          <span className="main-box-label">Name</span>
          <span className="main-box-description">Description</span>
        </div>
        <List people={this.props.people} />
      </div>
    );
  }
}
