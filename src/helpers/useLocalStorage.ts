import { isSSR } from './isSSR';

export const useLocalStorage = (key: string) => ({
  setItem: (value: string) => localStorage.setItem(key, value),
  getItem: () => (isSSR() ? null : window.localStorage.getItem(key)),
});
