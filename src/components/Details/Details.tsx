import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Items, LoadStatus } from '../../helpers/types';
import { Spinner } from '../Spinner';
import { requests } from '../../helpers/requests';
import './details.css';
import { useSearchParams } from 'react-router';

interface PersonLoadState {
  person: Items | null;
  loadStatus: LoadStatus;
  errorText: string;
}
export const Details = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [personLoadState, setPersonLoadState] = useState<PersonLoadState>({
    person: null,
    loadStatus: 'pending',
    errorText: '',
  });

  useEffect(() => {
    const getPerson = async () => {
      setPersonLoadState({
        person: null,
        loadStatus: 'loading',
        errorText: '',
      });
      const { data, error: errorText } = await requests.get(
        `https://swapi.dev/api/people/${id}/`
      );
      setPersonLoadState({
        person: errorText ? null : data,
        loadStatus: errorText ? 'error' : 'loaded',
        errorText,
      });
    };

    getPerson();
  }, [id]);

  if (
    personLoadState.loadStatus === 'loading' ||
    personLoadState.loadStatus === 'pending'
  ) {
    return (
      <div className="item-details">
        <Spinner />
      </div>
    );
  }

  if (!personLoadState.person) {
    return (
      <div className="item-details">
        <span>{personLoadState.errorText || 'Not Found'}</span>
      </div>
    );
  }

  return (
    <div className="item-details">
      <h4 className="item-details-label">{`Name: ${personLoadState.person.name}`}</h4>
      <ul className="item-details-list">
        <li className="item-details-point">{`Gender: ${personLoadState.person.gender}`}</li>
        <li className="item-details-point">{`birth_year: ${personLoadState.person.birth_year}`}</li>
        <li className="item-details-point">{`eye_color: ${personLoadState.person.eye_color}`}</li>
        <li className="item-details-point">{`height: ${personLoadState.person.height}`}</li>
        <li className="item-details-point">{`mass: ${personLoadState.person.mass}`}</li>
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
