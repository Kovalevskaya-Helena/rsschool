import { Link, useSearchParams } from 'react-router';
import './list.css';
import { parseId } from './parseId';
import { useSelector, useDispatch } from 'react-redux';
import { toggleItem, getSelectedItems } from '../../redux/selectedItemsSlice';
import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { Spinner } from '../Spinner';
//TBD: add amount of pages on pagination
export interface ListProps {
  previous: string | null;
  next: string | null;
}

export const List = () => {
  const [searchParams] = useSearchParams();
  const {
    data: { results: people = [] } = {},
    isSuccess,
    isFetching,
    isError,
  } = useGetStarWarsPeople();
  const dispatch = useDispatch();
  const selectedItems = useSelector(getSelectedItems);

  if (isSuccess && people.length === 0) {
    return (
      <div className="details-list-wrapper">
        <span>Nothing was found</span>
      </div>
    );
  }

  return (
    <div className="details-list-wrapper">
      {isFetching && <Spinner />}
      {isError && <span className="errorText">Something were wrong ...</span>}
      {!isFetching && !isError && isSuccess && (
        <ul className="details-list" data-testid="details-list">
          {people.map((person) => (
            <li key={person.url} className="details-item">
              <input
                type="checkbox"
                checked={person.url in selectedItems}
                onChange={() => dispatch(toggleItem(person))}
              />
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
      )}
    </div>
  );
};
