import { Link, useParams, useSearchParams } from 'react-router';
import { Spinner } from '../Spinner';
import './details.css';
import { useGetStarwarsPerson } from './useGetStarwarsPerson';

export const Details = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const {
    data: person,
    isFetching,
    isError,
    isLoading,
    isUninitialized,
    error,
  } = useGetStarwarsPerson(id as string);

  if (isFetching || isLoading || isUninitialized) {
    return (
      <div className="item-details">
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
      <div className="item-details">
        <div>An error has occurred:</div>
        <div>{getErrorMessage()}</div>
      </div>
    );
  }

  return (
    <div className="item-details">
      <h4 className="item-details-label">{`Name: ${person.name}`}</h4>
      <ul className="item-details-list">
        <li className="item-details-point">{`Gender: ${person.gender}`}</li>
        <li className="item-details-point">{`birth_year: ${person.birth_year}`}</li>
        <li className="item-details-point">{`eye_color: ${person.eye_color}`}</li>
        <li className="item-details-point">{`height: ${person.height}`}</li>
        <li className="item-details-point">{`mass: ${person.mass}`}</li>
      </ul>
      <Link
        to={{
          pathname: `/`,
          search: searchParams.toString(),
        }}
        className="item-details-link"
      >
        {' '}
        Close{' '}
      </Link>
    </div>
  );
};
