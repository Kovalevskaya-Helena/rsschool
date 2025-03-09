import styles from './list.module.css';
import { parseId } from './parseId';
import { useSelector, useDispatch } from 'react-redux';
import { toggleItem, getSelectedItems } from '../../redux/selectedItemsSlice';
import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { Spinner } from '../Spinner';
import { useRouter } from 'next/router';

export interface ListProps {
  previous: string | null;
  next: string | null;
}

export const List = () => {
  const router = useRouter();
  const {
    data: { results: people = [] } = {},
    isSuccess,
    isFetching,
    isError,
  } = useGetStarWarsPeople();
  const dispatch = useDispatch();
  const selectedItems = useSelector(getSelectedItems);

  const onOpenDetails = (id: string) => {
    router.push(
      {
        pathname: '/',
        query: { ...router.query, details: id },
      },
      undefined,
      { shallow: true }
    );
  };

  if (isSuccess && people.length === 0) {
    return (
      <div className={styles.details_list_wrapper}>
        <span>Nothing was found</span>
      </div>
    );
  }

  return (
    <div className={styles.details_list_wrapper}>
      {isFetching && <Spinner />}
      {isError && <span>Something were wrong ...</span>}
      {!isFetching && !isError && isSuccess && (
        <ul className={styles.details_list} data-testid="details-list">
          {people.map((person) => (
            <li key={person.url} className={styles.details_item}>
              <input
                type="checkbox"
                checked={person.url in selectedItems}
                onChange={() => dispatch(toggleItem(person))}
              />
              <span
                className={styles.details_link}
                onClick={() => onOpenDetails(parseId(person.url))}
              >
                {person.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
