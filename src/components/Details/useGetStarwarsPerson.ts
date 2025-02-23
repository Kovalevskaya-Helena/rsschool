import { useGetStarwarsPersonQuery } from '../../redux/api';

export const useGetStarwarsPerson = (
  id: string
): Omit<ReturnType<typeof useGetStarwarsPersonQuery>, 'refetch'> => {
  const { data, isFetching, isError, isLoading, isUninitialized, error } =
    useGetStarwarsPersonQuery(id as string);

  return {
    data,
    isFetching,
    isError,
    isLoading,
    isUninitialized,
    error,
  };
};
