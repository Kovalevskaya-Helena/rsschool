import { Search } from '../Search';
import { Theme } from '../Theme';
import styles from './header.module.css';

export interface HeaderProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}
export const Header = ({ searchText, onChangeText, onSearch }: HeaderProps) => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_wrapper}>
        <div />
        <header className={styles.header}>Search app</header>
        <Theme />
      </div>
      <Search
        searchText={searchText}
        onChangeText={onChangeText}
        onSearch={onSearch}
      />
    </div>
  );
};
