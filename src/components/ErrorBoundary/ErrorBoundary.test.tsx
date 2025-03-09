import { render, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { ErrorButton } from '../ErrorButton';

describe('ErrorBoundary', () => {
  test('Render fallback on errorr', async () => {
    const { getByRole, findByText } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const erroButton = getByRole('button', { name: /Error button/ });

    fireEvent.click(erroButton);

    await findByText('Sorry.. there was an error!');
  });
});
