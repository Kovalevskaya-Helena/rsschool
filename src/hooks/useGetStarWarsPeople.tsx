import { useSearchParams } from 'react-router';
import { useGetStarWarsPeopleQuery } from '../redux/api';
export const useGetStarWarsPeople = () => {
  const [searchParams, updateSearchParams] = useSearchParams();
  const { data, isSuccess, isFetching, isError } = useGetStarWarsPeopleQuery(
    searchParams.toString()
  );
  return { updateSearchParams, data, isSuccess, isFetching, isError };
};
