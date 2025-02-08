import { Search } from '../Search';
import './header.css';

export interface HeaderProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}
export const Header = ({ searchText, onChangeText, onSearch }: HeaderProps) => {
  return (
    <div className="header-container">
      <header className="header">Search app</header>
      <Search
        searchText={searchText}
        onChangeText={onChangeText}
        onSearch={onSearch}
      />
    </div>
  );
};
