import { useGetStarwarsPersonQuery } from '../../redux/api';
import { useGetStarwarsPerson } from './useGetStarwarsPerson';
import { Item } from '../../helpers/types';

jest.mock('../../redux/api');

describe('useGetStarwarsPerson', () => {
  const expected = {
    data: {} as Item,
    isFetching: false,
    isError: false,
    isLoading: false,
    isUninitialized: false,
    error: {},
  };

  test('valid hook', () => {
    (
      useGetStarwarsPersonQuery as jest.MockedFn<
        () => Omit<ReturnType<typeof useGetStarwarsPersonQuery>, 'refetch'>
      >
    ).mockReturnValue(expected);

    const result = useGetStarwarsPerson('2');

    expect(result).toEqual(expected);
    expect(useGetStarwarsPersonQuery).toHaveBeenLastCalledWith('2');
  });
});
