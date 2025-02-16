import { createContext } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextState {
  theme: Theme;
  setTheme: ((t: Theme) => void) & ((cb: (p: Theme) => Theme) => void);
}

export const ThemeContext = createContext<ThemeContextState>({
  theme: 'dark',
  setTheme: () => void 0,
});
