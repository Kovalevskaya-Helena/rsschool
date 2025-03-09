import { PeopleSearch } from './PeopleSearch';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../helpers/clsx', () => ({
  clsx: jest.fn(),
}));

jest.mock('../../hooks/useGetStarWarsPeople', () => ({
  useGetStarWarsPeople: jest.fn(() => ({})),
}));

jest.mock('../Main/Main', () => ({
  Main: () => <div>Main</div>,
}));

describe('PeopleSearch', () => {
  test('renders search', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/mocked-path',
      query: { id: '123' },
      push: jest.fn(),
    });
    const { getByRole } = render(<PeopleSearch />);
    getByRole('textbox');
  });
});
