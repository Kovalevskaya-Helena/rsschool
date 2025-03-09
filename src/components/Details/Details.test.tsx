import { render } from '@testing-library/react';
import { Details } from './Details';
import { useGetStarwarsPerson } from './useGetStarwarsPerson';
import { Item } from '../../helpers/types';
import { useRouter } from 'next/router';

const mockItem: Item = {
  birth_year: '',
  eye_color: '',
  gender: '',
  height: '',
  mass: '',
  name: '',
  url: '',
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('./useGetStarwarsPerson');

jest.mock('../../helpers/clsx', () => ({
  clsx: jest.fn(),
}));

describe('Details', () => {
  test('Renders Spinner when isFetching is true', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/mocked-path',
      query: { details: '123' },
      push: jest.fn(),
    });

    (
      useGetStarwarsPerson as jest.MockedFn<typeof useGetStarwarsPerson>
    ).mockReturnValue({
      data: mockItem,
      isFetching: true,
      isError: false,
      isLoading: false,
      isUninitialized: false,
      error: { message: '' },
    });

    const { getByTestId } = render(<Details />);

    getByTestId('spinner');
  });

  test('Renders Spinner when isLoading is true', () => {
    (
      useGetStarwarsPerson as jest.MockedFn<typeof useGetStarwarsPerson>
    ).mockReturnValue({
      data: mockItem,
      isFetching: false,
      isError: false,
      isLoading: true,
      isUninitialized: false,
      error: { message: '' },
    });

    const { getByTestId } = render(<Details />);

    getByTestId('spinner');
  });

  test('Renders Spinner when is isUninitialized true', () => {
    (
      useGetStarwarsPerson as jest.MockedFn<typeof useGetStarwarsPerson>
    ).mockReturnValue({
      data: mockItem,
      isFetching: false,
      isError: false,
      isLoading: false,
      isUninitialized: true,
      error: { message: '' },
    });

    const { getByTestId } = render(<Details />);

    getByTestId('spinner');
  });

  test(`Renders message when is isError true and error don't has field 'message' `, () => {
    (
      useGetStarwarsPerson as jest.MockedFn<typeof useGetStarwarsPerson>
    ).mockReturnValue({
      data: mockItem,
      isFetching: false,
      isError: true,
      isLoading: false,
      isUninitialized: false,
      error: {},
    });

    const { getByText } = render(<Details />);

    getByText(/something is broken. But we are fixing. Please try later./i);
  });
  test(`Renders message when is isError true and error has field 'message' `, () => {
    (
      useGetStarwarsPerson as jest.MockedFn<typeof useGetStarwarsPerson>
    ).mockReturnValue({
      data: mockItem,
      isFetching: false,
      isError: true,
      isLoading: false,
      isUninitialized: false,
      error: { message: 'error' },
    });

    const { getAllByText } = render(<Details />);

    getAllByText(/error/i);
  });
  test('Renders list when is isSuccessfull true', () => {
    (
      useGetStarwarsPerson as jest.MockedFn<typeof useGetStarwarsPerson>
    ).mockReturnValue({
      data: mockItem,
      isFetching: false,
      isError: false,
      isLoading: false,
      isUninitialized: false,
      error: { message: '' },
    });

    const { getAllByRole } = render(<Details />);

    getAllByRole('listitem');
  });
});
