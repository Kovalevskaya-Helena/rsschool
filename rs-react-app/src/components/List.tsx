import React, { Component } from 'react';
import { ListItem } from './ListItem';

export class List extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ListItem label={item.name} />
            <ListItem label={item.name} />
          </li>
        ))}
      </ul>
    );
  }
}
