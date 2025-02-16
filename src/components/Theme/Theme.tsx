import { useContext } from 'react';
import { ThemeContext } from '../../helpers/contexts';
import { Button } from '../Button';
import './theme.css';

export const Theme = () => {
  const { setTheme, theme } = useContext(ThemeContext);

  return (
    <Button
      className="theme-button"
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
    >
      <span className="material-symbols-outlined">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </Button>
  );
};
