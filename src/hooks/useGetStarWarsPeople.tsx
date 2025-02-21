import { useSearchParams } from 'react-router';
import { useGetStarWarsPeopleQuery } from '../redux/api';

export const useGetStarWarsPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isSuccess, isFetching, isError } = useGetStarWarsPeopleQuery(
    searchParams.toString()
  );

  const query = Object.fromEntries(searchParams.entries());

  const updateQuery = (key: string, value: string) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set(key, value);
      return prevSearchParams;
    });
  };

  return {
    query,
    updateQuery,
    data,
    isSuccess,
    isFetching,
    isError,
  };
};
