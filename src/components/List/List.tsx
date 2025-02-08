import { Items } from '../../helpers/types';
import './list.css';

export const List = ({ people }: { people: Items[] }) => {
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
};
