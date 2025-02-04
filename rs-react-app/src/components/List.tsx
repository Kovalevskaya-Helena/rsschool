import React, { Component } from 'react';
import { ListItem } from './ListItem';
import { Items, LoadStatus } from '../helpers/types';

interface ListProps {
  people: Items[];
  loadStatus: LoadStatus;
}

export class List extends Component<ListProps> {
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
