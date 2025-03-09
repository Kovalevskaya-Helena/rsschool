import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from './contexts';
import { useContext } from 'react';

describe('context', () => {
  test('should provide the theme context to children', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useContext(ThemeContext);

      return <button onClick={() => toggleTheme()}>{theme}</button>;
    };

    const { getByRole } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    getByRole('button', { name: 'dark' });
    fireEvent.click(getByRole('button', { name: 'dark' }));
    getByRole('button', { name: 'light' });
    fireEvent.click(getByRole('button', { name: 'light' }));
    getByRole('button', { name: 'dark' });
  });
});
