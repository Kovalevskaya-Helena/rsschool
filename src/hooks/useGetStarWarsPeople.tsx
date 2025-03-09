import { ParsedUrlQueryInput } from 'querystring';
import { useGetStarWarsPeopleQuery } from '../redux/api';
import { useRouter } from 'next/router';

export const useGetStarWarsPeople = () => {
  const { query, push } = useRouter();
  const { page, search } = query as {
    page?: string;
    details?: string;
    search?: string;
  };

  const { data, isSuccess, isFetching, isError } = useGetStarWarsPeopleQuery({
    ...(page && { page }),
    ...(search && { search }),
  });

  const setQuery = (query: ParsedUrlQueryInput) => {
    push({ pathname: '/', query }, undefined, { shallow: true });
  };

  const updateQuery = (query: Record<string, string>) => {
    setQuery({ ...query, ...query });
  };

  return {
    query,
    updateQuery,
    data,
    isSuccess,
    isFetching,
    isError,
    setQuery,
  };
};
