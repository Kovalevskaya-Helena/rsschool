import { useGetStarWarsPeopleQuery } from '../redux/api';
import { useGetStarWarsPeople } from './useGetStarWarsPeople';
import { Item } from '../helpers/types';
import { useRouter } from 'next/router';

jest.mock('../redux/api');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('useGetStarWarsPeople', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', search: 'Luke' },
      push: mockPush,
    });
  });
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
      useGetStarWarsPeopleQuery as jest.MockedFn<
        () => Omit<ReturnType<typeof useGetStarWarsPeopleQuery>, 'refetch'>
      >
    ).mockReturnValue(expected);

    const result = useGetStarWarsPeople();

    expect(result).toEqual(
      expect.objectContaining({
        ...expected,
        query: { page: '1', search: 'Luke' },
      })
    );
  });
});
