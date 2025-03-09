import { FormEvent } from 'react';
import { Button } from '../Button';
import styles from './search.module.css';

interface SearchProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const Search = ({ searchText, onChangeText, onSearch }: SearchProps) => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className={styles.searchContainer} onSubmit={onSubmit}>
      <input
        className={styles.searchInput}
        placeholder={'search Star Wars...'}
        value={searchText}
        onChange={(event) => onChangeText(event.target.value)}
      />
      <Button className={styles.searchButton} onClick={onSearch}>
        Search
      </Button>
    </form>
  );
};
