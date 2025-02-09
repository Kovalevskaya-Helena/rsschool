import { Button } from '../Button';
import './search.css';

interface SearchProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const Search = ({ searchText, onChangeText, onSearch }: SearchProps) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder={'search Star Wars...'}
        value={searchText}
        onChange={(event) => onChangeText(event.target.value)}
      />
      <Button className="search-button" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};
