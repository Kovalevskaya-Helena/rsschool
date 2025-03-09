import { Main } from './Main';
import { render } from '@testing-library/react';

jest.mock('../List');
jest.mock('../Popup');
jest.mock('../Pagination');

describe('Main', () => {
  test('render results', () => {
    const { getByText } = render(<Main />);

    getByText('Results');
  });
});
