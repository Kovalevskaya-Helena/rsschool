import type { PropsWithChildren } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { List } from '.';

vi.mock('react-router', () => ({
  useSearchParams: () => [''],
  Link: (props: PropsWithChildren) => <a>{props.children}</a>,
}));

const mockData = [
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
];

describe('List', () => {
  test('List renders successfully', () => {
    const { getAllByRole } = render(
      <List people={mockData} previous="" next="" onPagination={vi.fn()} />
    );

    expect(getAllByRole('listitem')).toHaveLength(mockData.length);
    expect(getAllByRole('button')).toHaveLength(2);
  });

  test('Invokes onPagination with correct params', () => {
    const testNext = 'test_next_link';
    const testPrevious = 'test_previous_link';
    const onPagination = vi.fn();

    const { getByRole } = render(
      <List
        people={mockData}
        previous={testPrevious}
        next={testNext}
        onPagination={onPagination}
      />
    );

    fireEvent.click(getByRole('button', { name: 'next' }));
    expect(onPagination).toHaveBeenCalledWith(testNext);

    fireEvent.click(getByRole('button', { name: 'previous' }));
    expect(onPagination).toHaveBeenCalledWith(testPrevious);
  });

  test('When gets empty people list then renders the placeholder', () => {
    const { queryByRole, getByText } = render(
      <List people={[]} previous="" next="" onPagination={vi.fn()} />
    );

    expect(queryByRole('listitem')).not.toBeInTheDocument();
    getByText('Nothing was found');
  });
});
