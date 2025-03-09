import { render } from '@testing-library/react';
import { NotFoundPage } from './NotFoundpage';
describe('NotFoundPage', () => {
  test('render 404', () => {
    const { getByText } = render(<NotFoundPage />);
    getByText('Error 404');
  });
});
