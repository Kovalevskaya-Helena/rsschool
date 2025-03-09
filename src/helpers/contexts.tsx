import {
  createContext,
  useState,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextState>({
  theme: 'dark',
  toggleTheme: () => void 0,
});

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
