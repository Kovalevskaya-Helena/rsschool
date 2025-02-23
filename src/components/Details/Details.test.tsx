import type { PropsWithChildren } from 'react';
import { test, describe, vi, MockedFunction } from 'vitest';
import { render } from '@testing-library/react';
import { Details } from './Details';
import { useGetStarwarsPerson } from './useGetStarwarsPerson';
import { Item } from '../../helpers/types';

const mockItem: Item = {
  birth_year: '',
  eye_color: '',
  gender: '',
  height: '',
  mass: '',
  name: '',
  url: '',
};

vi.mock('react-router', () => ({
  useSearchParams: () => [''],
  useParams: () => ({ id: '' }),
  Link: (props: PropsWithChildren) => <a>{props.children}</a>,
}));

vi.mock('./useGetStarwarsPerson');

describe('Details', () => {
  test('Renders Spinner when isFetching is true', () => {
    (
      useGetStarwarsPerson as MockedFunction<typeof useGetStarwarsPerson>
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
      useGetStarwarsPerson as MockedFunction<typeof useGetStarwarsPerson>
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
      useGetStarwarsPerson as MockedFunction<typeof useGetStarwarsPerson>
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
      useGetStarwarsPerson as MockedFunction<typeof useGetStarwarsPerson>
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
      useGetStarwarsPerson as MockedFunction<typeof useGetStarwarsPerson>
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
      useGetStarwarsPerson as MockedFunction<typeof useGetStarwarsPerson>
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
