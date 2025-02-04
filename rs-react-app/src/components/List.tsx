import React, { Component } from 'react';
import { ListItem } from './ListItem';

export class List extends Component {
  render() {
    const { people } = this.props;
    return (
      <ul>
        {people.map((person) => (
          <li key={person.url}>
            <ListItem label={person.name} />
            <ListItem label={person.gender} />
          </li>
        ))}
      </ul>
    );
  }
}
