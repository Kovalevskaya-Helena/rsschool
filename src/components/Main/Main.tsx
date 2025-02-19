import { List } from '../List';
import { Spinner } from '../Spinner/Spinner';
import './main.css';
import { useSearchParams } from 'react-router';
import { useGetStarWarsPeopleQuery } from '../../redux/api';

export const Main = () => {
  const [searchParams] = useSearchParams();

  const { data, isSuccess, isFetching, isError } = useGetStarWarsPeopleQuery(
    searchParams.toString()
  );

  return (
    <div className="main-container">
      <header className="main-header">Results</header>
      {isFetching && <Spinner />}
      {isError && <span className="errorText">Something were wrong ...</span>}
      {!isFetching && !isError && isSuccess && (
        <List people={data.results} previous={data.previous} next={data.next} />
      )}
    </div>
  );
};
