import { expect, test, describe, vi, MockedFunction } from 'vitest';
import { useSearchParams } from 'react-router';
import { useGetStarWarsPeopleQuery } from '../redux/api';
import { useGetStarWarsPeople } from './useGetStarWarsPeople';
import { Item } from '../helpers/types';

vi.mock('../redux/api');
vi.mock('react-router');

describe('useGetStarWarsPeople', () => {
  const expected = {
    data: {
      results: [] as Item[],
      next: '',
      previous: '',
      count: 666,
    },
    isSuccess: true,
    isFetching: false,
    isError: false,
  };

  test('valid hook', () => {
    (
      useGetStarWarsPeopleQuery as MockedFunction<
        () => Omit<ReturnType<typeof useGetStarWarsPeopleQuery>, 'refetch'>
      >
    ).mockReturnValue(expected);

    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      [new URLSearchParams(), () => void 0]
    );

    const result = useGetStarWarsPeople();

    expect(result).toEqual(
      expect.objectContaining({
        ...expected,
        query: {},
      })
    );
  });
});
