import { Link, useSearchParams } from 'react-router';
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
  const [searchParams] = useSearchParams();

  const getId = (url: string) => {
    return url.split('/').at(-2);
  };
  return (
    <>
      <ul className="details-list">
        {people.map((person) => (
          <li key={person.url} className="details-item">
            <Link
              to={{
                pathname: `/details/${getId(person.url)}`,
                search: searchParams.toString(),
              }}
              className="details-link"
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
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
