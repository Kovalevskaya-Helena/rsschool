import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { noop } from '../../helpers/noop';

jest.mock('../../hooks/useGetStarWarsPeople');

const mockData = {
  results: [
    {
      name: 'John',
      gender: 'male',
      birth_year: '13.01.1000',
      height: '132',
      mass: '132',
      eye_color: 'blue',
      url: '/13223',
    },
    {
      name: 'Jane',
      gender: 'female',
      birth_year: '13.02.1900',
      height: '10',
      mass: '13',
      eye_color: 'green',
      url: '/13223',
    },
  ],
  next: '',
  previous: '',
  count: 333,
};

describe('Pagination', () => {
  test('pagination renders successfully', () => {
    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockData,
      isSuccess: true,
      isFetching: false,
      isError: false,
      setQuery: noop,
    });
    const { getAllByRole } = render(<Pagination />);
    getAllByRole('button');
  });

  test('when click set correct query params', async () => {
    const updateQuerySpy = jest.fn();

    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: updateQuerySpy,
      data: {
        ...mockData,
        next: 'https://swapi.dev/api/people/?page=2',
        previous: 'https://swapi.dev/api/people/?page=1',
      },
      isSuccess: true,
      isFetching: false,
      isError: false,
      setQuery: jest.fn(),
    });

    const { getByRole } = render(<Pagination />);

    const nextButton = getByRole('button', { name: 'next' });
    const prevButton = getByRole('button', { name: 'previous' });

    await fireEvent.click(nextButton);

    expect(updateQuerySpy).toHaveBeenCalledWith({ page: '2' });

    await fireEvent.click(prevButton);

    expect(updateQuerySpy).toHaveBeenCalledWith({ page: '1' });
  });

  test(`when click with invalid url doesn't set query params`, async () => {
    const updateQuerySpy = jest.fn();

    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: updateQuerySpy,
      data: {
        ...mockData,
        next: null,
        previous: '',
      },
      isSuccess: true,
      isFetching: false,
      isError: false,
      setQuery: noop,
    });

    const { getByRole } = render(<Pagination />);

    const nextButton = getByRole('button', { name: 'next' });
    const prevButton = getByRole('button', { name: 'previous' });

    await fireEvent.click(nextButton);

    expect(updateQuerySpy).not.toHaveBeenCalled();

    await fireEvent.click(prevButton);

    expect(updateQuerySpy).not.toHaveBeenCalled();
  });

  test(`when click with invalid page doesn't set query params`, async () => {
    const updateQuerySpy = jest.fn();

    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: updateQuerySpy,
      data: {
        ...mockData,
        next: 'https://swapi.dev/api/people/',
        previous: null,
      },
      isSuccess: true,
      isFetching: false,
      isError: false,
      setQuery: noop,
    });

    const { getByRole } = render(<Pagination />);

    const nextButton = getByRole('button', { name: 'next' });

    await fireEvent.click(nextButton);

    expect(updateQuerySpy).not.toHaveBeenCalled();
  });
});
