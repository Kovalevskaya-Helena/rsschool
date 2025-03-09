import { Spinner } from '../Spinner';
import styles from './details.module.css';
import { useGetStarwarsPerson } from './useGetStarwarsPerson';
import { useRouter } from 'next/router';
import { clsx } from '../../helpers/clsx';
import { filterObjectKeys } from 'src/helpers/filterObjectKeys';

export const Details = () => {
  const router = useRouter();
  const { query } = router;

  const {
    data: person,
    isFetching,
    isError,
    isLoading,
    isUninitialized,
    error,
  } = useGetStarwarsPerson(query.details as string);

  const onCloseDetails = () => {
    router.push(
      {
        pathname: '/',
        query: filterObjectKeys(router.query, (key) => key !== 'details'),
      },
      undefined,
      { shallow: true }
    );
  };

  if (isFetching || isLoading || isUninitialized) {
    return (
      <div className={clsx(styles.itemDetails, 'details')}>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    const getErrorMessage = (): string => {
      if ('message' in error && typeof error.message === 'string') {
        return error.message;
      }

      return 'Something is broken. But we are fixing. Please try later.';
    };

    return (
      <div className={clsx(styles.itemDetails, 'details')}>
        <div>An error has occurred:</div>
        <div>{getErrorMessage()}</div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.itemDetails, 'details')}>
      <h4>{`Name: ${person.name}`}</h4>
      <ul className={styles.itemDetailsList}>
        <li
          className={styles.itemDetailsPoint}
        >{`Gender: ${person.gender}`}</li>
        <li
          className={styles.itemDetailsPoint}
        >{`birth_year: ${person.birth_year}`}</li>
        <li
          className={styles.itemDetailsPoint}
        >{`eye_color: ${person.eye_color}`}</li>
        <li
          className={styles.itemDetailsPoint}
        >{`height: ${person.height}`}</li>
        <li className={styles.itemDetailsPoint}>{`mass: ${person.mass}`}</li>
      </ul>

      <div className={styles.itemDetailsLink} onClick={onCloseDetails}>
        Close
      </div>
    </div>
  );
};
