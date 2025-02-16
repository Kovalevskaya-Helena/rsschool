import { Outlet } from 'react-router';
import { useState } from 'react';
import { PeopleSearch } from '../PeopleSearch';
import { ThemeContext, type Theme } from '../../helpers/contexts';
import './layout.css';
import { clsx } from '../../helpers/clsx';

export const Layout = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={clsx('layout', theme === 'light' && 'light')}>
        <PeopleSearch />
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
};
