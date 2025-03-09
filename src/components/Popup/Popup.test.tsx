import { Popup } from './Popup';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

jest.mock('react-redux');

describe('Popup', () => {
  test('renders search', () => {
    (useSelector as jest.MockedFn<typeof useSelector>).mockReturnValue({});

    const { getByText } = render(<Popup />);
    getByText('Unselect all');
  });
});
