import { useContext } from 'react';
import { ThemeContext } from '../../helpers/contexts';
import { Button } from '../Button';
import styles from './theme.module.css';

export const Theme = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Button className={styles.themeButton} onClick={toggleTheme}>
      <span className="material-symbols-outlined" data-testid="theme">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </Button>
  );
};
