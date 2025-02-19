import { Link, useSearchParams } from 'react-router';
import { Button } from '../Button';
import './list.css';
import { parseId } from './parseId';

import type { Items } from '../../helpers/types';

export interface ListProps {
  people: Items[];
  previous: string | null;
  next: string | null;
}

export const List = ({ people, previous, next }: ListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPagination = (url: string | null) => {
    if (!url) return;

    const page = new URLSearchParams(new URL(url).searchParams).get('page');
    if (!page) return;

    setSearchParams((prev) => {
      prev.set('page', page);
      return prev;
    });
  };

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
          onClick={() => onPagination(previous)}
        >
          &lt;
        </Button>
        <Button
          ariaLabel="next"
          className="pagination-button"
          disabled={next === null}
          onClick={() => onPagination(next)}
        >
          &gt;
        </Button>
      </div>
    </>
  );
};
