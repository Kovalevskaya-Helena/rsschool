import type { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { expect, test, describe, vi, MockedFunction } from 'vitest';
import { List } from '.';
import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { noop } from '../../helpers/noop';

vi.mock('react-router', () => ({
  useSearchParams: () => [''],
  Link: (props: PropsWithChildren) => <a>{props.children}</a>,
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: () => [],
}));

vi.mock('../../hooks/useGetStarWarsPeople');

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

const mockDataEmpty = {
  results: [],
  next: '',
  previous: '',
  count: 333,
};

describe('List', () => {
  test('List renders successfully', () => {
    (
      useGetStarWarsPeople as MockedFunction<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockData,
      isSuccess: true,
      isFetching: false,
      isError: false,
    });
    const { getAllByRole } = render(<List />);

    expect(getAllByRole('listitem')).toHaveLength(mockData.results.length);
    expect(getAllByRole('checkbox')).toHaveLength(mockData.results.length);
  });

  test('When gets empty people list then renders the placeholder', () => {
    (
      useGetStarWarsPeople as MockedFunction<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockDataEmpty,
      isSuccess: true,
      isFetching: false,
      isError: false,
    });
    const { queryByRole, getByText } = render(<List />);

    expect(queryByRole('listitem')).not.toBeInTheDocument();
    getByText('Nothing was found');
  });
  test('Renders Spinner when isFetching is true', () => {
    (
      useGetStarWarsPeople as MockedFunction<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockData,
      isSuccess: true,
      isFetching: true,
      isError: false,
    });
    const { getByTestId } = render(<List />);

    getByTestId('spinner');
  });
  test('Renders message when is isError true', () => {
    (
      useGetStarWarsPeople as MockedFunction<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockData,
      isSuccess: true,
      isFetching: false,
      isError: true,
    });
    const { getByText } = render(<List />);

    getByText(/Something were wrong/i);
  });
});
