import React, { Component } from 'react';
import { List } from './List';

export class Main extends Component {
  render() {
    return (
      <>
        <header>Results</header>
        <span>Name</span>
        <span>Description</span>
        <List items={items} />
      </>
    );
  }
}
