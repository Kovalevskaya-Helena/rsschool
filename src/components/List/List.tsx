import { Component } from 'react';
import { Items, LoadStatus } from '../../helpers/types';
import './list.css';

interface ListProps {
  people: Items[];
  loadStatus: LoadStatus;
}

export class List extends Component<ListProps> {
  render() {
    const { people } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Eye Color</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.url}>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.birth_year}</td>
              <td>{person.eye_color}</td>
              <td>{person.height}</td>
              <td>{person.mass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
