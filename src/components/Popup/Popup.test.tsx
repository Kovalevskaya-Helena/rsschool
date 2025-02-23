import { Popup } from './Popup';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MockedFunction } from 'vitest';

vi.mock('react-redux');

describe('Popup', () => {
  test('renders search', () => {
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue({});

    const { getByText } = render(<Popup />);
    getByText('Unselect all');
  });
});
