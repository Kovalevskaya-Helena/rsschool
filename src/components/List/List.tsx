import { Link, useSearchParams } from 'react-router';
import { Button } from '../Button';
import './list.css';
import { parseId } from './parseId';

import type { Items } from '../../helpers/types';

export interface ListProps {
  people: Items[];
  previous: string | null;
  next: string | null;
  onPagination: (url: string) => void;
}
export const List = ({ people, previous, next, onPagination }: ListProps) => {
  const [searchParams] = useSearchParams();

  if (people.length === 0) {
    return <span>Nothing was found</span>;
  }

  return (
    <>
      <ul className="details-list" data-testid="details-list">
        {people.map((person) => (
          <li key={person.url} className="details-item">
            <Link
              to={{
                pathname: `/details/${parseId(person.url)}`,
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
          ariaLabel="previous"
          className="pagination-button"
          disabled={previous === null}
          onClick={() => onPagination(previous as string)}
        >
          &lt;
        </Button>
        <Button
          ariaLabel="next"
          className="pagination-button"
          disabled={next === null}
          onClick={() => onPagination(next as string)}
        >
          &gt;
        </Button>
      </div>
    </>
  );
};
