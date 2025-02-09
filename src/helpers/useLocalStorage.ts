export function useLocalStorage(key: string) {
  return {
    setItem: (value: string) => localStorage.setItem(key, value),
    getItem: () => localStorage.getItem(key),
  };
}
