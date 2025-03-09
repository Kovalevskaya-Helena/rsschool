import { render } from '@testing-library/react';
import { List } from '.';
import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { noop } from '../../helpers/noop';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: () => [],
  useStore: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

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
      url: '/13227',
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
    const { getAllByRole } = render(<List />);

    expect(getAllByRole('listitem')).toHaveLength(mockData.results.length);
    expect(getAllByRole('checkbox')).toHaveLength(mockData.results.length);
  });

  test('When gets empty people list then renders the placeholder', () => {
    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockDataEmpty,
      isSuccess: true,
      isFetching: false,
      isError: false,
      setQuery: noop,
    });
    const { queryByRole, getByText } = render(<List />);

    expect(queryByRole('listitem')).not.toBeInTheDocument();
    getByText('Nothing was found');
  });
  test('Renders Spinner when isFetching is true', () => {
    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockData,
      isSuccess: true,
      isFetching: true,
      isError: false,
      setQuery: noop,
    });
    const { getByTestId } = render(<List />);

    getByTestId('spinner');
  });
  test('Renders message when is isError true', () => {
    (
      useGetStarWarsPeople as jest.MockedFn<typeof useGetStarWarsPeople>
    ).mockReturnValue({
      query: {},
      updateQuery: noop,
      data: mockData,
      isSuccess: true,
      isFetching: false,
      isError: true,
      setQuery: noop,
    });
    const { getByText } = render(<List />);

    getByText(/Something were wrong/i);
  });
});
