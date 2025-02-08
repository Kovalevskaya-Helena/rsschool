import { Items } from '../../helpers/types';
import { Button } from '../Button';
import './list.css';

export interface ListProps {
  people: Items[];
  previous: string | null;
  next: string | null;
  onPagination: (url: string) => void;
}
export const List = ({ people, previous, next, onPagination }: ListProps) => {
  return (
    <>
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
      <div className="pagination-container">
        <Button
          className="pagination-button"
          disabled={previous === null}
          onClick={() => onPagination(previous || '')}
        >
          &lt;
        </Button>
        <Button
          className="pagination-button"
          disabled={next === null}
          onClick={() => onPagination(next || '')}
        >
          &gt;
        </Button>
      </div>
    </>
  );
};
